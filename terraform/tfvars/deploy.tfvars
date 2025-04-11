general_config = {
  region      = "us-east-1"
  project     = "scientia"
  env         = "dev"
  application = "guilda-swagger"

}

ecs_logs = {
  is_there_log_config = true
  log_handler_type    = "awslogs"
  logs_name           = "kinesis_streams"
  buffer_limit        = "2097152"
  sidecar_image       = "amazon/aws-for-fluent-bit:latest"
  sidecar_name        = "log_router"
  configuration_type  = "fluentbit"
  firelens_configuration_options = {
    "enable-ecs-log-metadata" : "false"
  }
}

ecs_object_config = {
  container_port                  = 3000
  protocol                        = "HTTP"
  alb_listener_port               = 80
  app_count                       = 1
  fargate_version                 = "LATEST"
  fargate_cpu                     = "256"
  fargate_memory                  = "512"
  auto_scaling_max_capacity       = 2
  service_health_check_path       = "/health"
  aws_log_group_retention_in_days = 7
}

host_header = {
  inbound_host_header = ["guilda.scientia.estaciodev.net"]
}

alb_listener_port = {
  port     = 3000
  protocol = "HTTP"
}

api_gateway_configuration = {
  api_type                     = "public"
  api_endpoint_type            = ["regional"]
  api_key_source               = null
  disable_execute_api_endpoint = true
  api_gateway_policy           = null

  deploy_api_stage_name = "DEV"

  is_there_dns_name    = true
  subdomain_name       = "guilda"
  api_gateway_dns_type = "REGIONAL"

}

authorization_config = [{
  is_there_authorizer  = false
  authorizer_role_name = ""
  authorization_name   = "ExampleAuthorizer"
  authorization_type   = "AUTHORIZE"
  identity_source      = "method.request.header.Authorization"
  }, {
  is_there_authorizer  = false
  authorizer_role_name = ""
  authorization_name   = "ExampleAuthorizer2"
  authorization_type   = "AUTHORIZE"
  identity_source      = "method.request.header.Authorization"
}]
