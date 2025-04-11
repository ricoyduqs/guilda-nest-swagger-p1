module "ecs" {
  source          = "./modules/ecs"
  vpc_id          = data.aws_vpc.main.id
  project_zone    = data.aws_route53_zone.this.id
  cluster_id      = data.aws_ecs_cluster.ecs_scientia
  acm_arn         = data.aws_acm_certificate.cert.arn
  load_balancer   = data.aws_lb.alb
  subnet_id       = data.aws_subnets.privates.ids
  subnet_ip_block = [data.aws_vpc.main.cidr_block]
  ecr_image       = lower(join(":", ["${data.aws_ecr_repository.strapi.repository_url}", "${data.aws_ecr_repository.strapi.most_recent_image_tags[0]}"]))

  region      = var.general_config.region
  project     = var.general_config.project
  env         = var.general_config.env
  application = var.general_config.application


  alb_listener_port = var.alb_listener_port
  host_header       = var.host_header


  container_port                  = var.ecs_object_config.container_port
  protocol                        = var.ecs_object_config.protocol
  app_count                       = var.ecs_object_config.app_count
  fargate_version                 = var.ecs_object_config.fargate_version
  fargate_cpu                     = var.ecs_object_config.fargate_cpu
  fargate_memory                  = var.ecs_object_config.fargate_memory
  min_capacity                    = var.ecs_object_config.app_count
  max_capacity                    = var.ecs_object_config.auto_scaling_max_capacity
  service_health_check_path       = var.ecs_object_config.service_health_check_path
  aws_log_group_retention_in_days = var.ecs_object_config.aws_log_group_retention_in_days

  ecs_logs = {
    is_there_log_config            = var.ecs_logs.is_there_log_config
    log_handler_type               = var.ecs_logs.log_handler_type
    logs_name                      = var.ecs_logs.logs_name
    log_stream                     = var.ecs_logs.log_handler_type /*== "awslogs" ? data.aws_kinesis_stream.elastic_data_stream.name : null*/
    buffer_limit                   = var.ecs_logs.buffer_limit
    sidecar_image                  = var.ecs_logs.sidecar_image
    sidecar_name                   = var.ecs_logs.sidecar_name
    configuration_type             = var.ecs_logs.configuration_type
    firelens_configuration_options = var.ecs_logs.firelens_configuration_options
  }
}
