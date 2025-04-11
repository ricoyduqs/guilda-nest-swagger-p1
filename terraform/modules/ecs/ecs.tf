module "iam" {
  source      = "./iam"
  env         = var.env
  application = var.application
}

module "sg_ecs" {
  source        = "./sg"
  vpc_id        = var.vpc_id
  sg_name       = "service-${var.application}-${var.env}"
  ingress_rules = [{ from_port = "${var.container_port}", to_port = "${var.container_port}", protocol = "tcp", security_groups = "${var.load_balancer.security_groups}" }]
  egress_rules = [
    { from_port = "0", to_port = "0", protocol = "-1", cidr_blocks = ["0.0.0.0/0"] }
  ]
}

resource "aws_lb_target_group" "app" {
  name                              = "tg-${var.application}-${var.env}"
  vpc_id                            = var.vpc_id
  port                              = var.container_port
  protocol                          = var.protocol
  target_type                       = "ip"
  load_balancing_cross_zone_enabled = true

  health_check {
    path     = var.service_health_check_path
    interval = 50
    timeout  = 30
    matcher  = "200-399"
  }
}

resource "aws_lb_listener" "port" {
  load_balancer_arn = var.load_balancer.arn
  port              = var.alb_listener_port.port
  protocol          = var.alb_listener_port.protocol
  default_action {
    target_group_arn = aws_lb_target_group.app.arn
    type             = "forward"
    fixed_response {
      content_type = "text/plain"
      message_body = "Service Unavailable"
      status_code  = "503"
    }
  }
}

resource "aws_lb_listener_rule" "foward" {
  listener_arn = aws_lb_listener.port.arn
  priority     = 110

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
  condition {
    host_header {
      values = toset(var.host_header.inbound_host_header)
    }
  }
}

resource "aws_cloudwatch_log_group" "log" {
  name              = "lg-${var.application}-${var.env}"
  retention_in_days = var.aws_log_group_retention_in_days
}

resource "aws_ecs_task_definition" "this" {
  family                   = "task-${var.application}-${var.env}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory

  execution_role_arn = module.iam.role_arn
  task_role_arn      = module.iam.role_arn

  container_definitions = jsonencode(
    concat(
      [
        {
          name        = "${var.application}-${var.env}"
          image       = var.ecr_image
          networkMode = "awsvpc"
          portMappings = [
            {
              containerPort = var.container_port
              hostPort      = var.container_port
            }
          ]
          logConfiguration = var.ecs_logs.is_there_log_config ? {
            logDriver = var.ecs_logs.log_handler_type
            options = var.ecs_logs.log_handler_type == "awslogs" ? {
              awslogs-group         = aws_cloudwatch_log_group.log.name
              awslogs-region        = var.region
              awslogs-create-group  = "true"
              awslogs-stream-prefix = "ecs"
              } : var.ecs_logs.log_handler_type == "awsfirelens" ? {
              Name                    = var.ecs_logs.logs_name
              region                  = var.region
              stream                  = var.ecs_logs.log_stream
              log-driver-buffer-limit = var.ecs_logs.buffer_limit
            } : tomap(null)
          } : null
        }
      ],
      var.ecs_logs.log_handler_type == "awsfirelens" ? [
        {
          essential = true
          image     = var.ecs_logs.sidecar_image
          name      = var.ecs_logs.sidecar_name
          firelensConfiguration = {
            type    = var.ecs_logs.configuration_type
            options = { for key, value in var.ecs_logs.firelens_configuration_options : key => value }
          }
        }
      ] : []
    )
  )
}

resource "aws_ecs_service" "main" {
  name    = "service-${var.application}-${var.env}"
  cluster = var.cluster_id.id

  task_definition        = aws_ecs_task_definition.this.arn
  desired_count          = var.app_count
  launch_type            = "FARGATE"
  platform_version       = var.fargate_version
  enable_execute_command = true

  network_configuration {
    security_groups = [module.sg_ecs.security_group_id]
    subnets         = var.subnet_id
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "${var.application}-${var.env}"
    container_port   = var.container_port
  }

  lifecycle {
    ignore_changes = [desired_count]
  }
}
