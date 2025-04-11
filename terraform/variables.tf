variable "general_config" {
  type = object({
    region      = string
    project     = string
    env         = string
    application = string
  })
}
variable "ecs_logs" {
  type = object({
    is_there_log_config            = bool
    log_handler_type               = string
    logs_name                      = string
    log_stream                     = optional(string)
    buffer_limit                   = string
    sidecar_image                  = string
    sidecar_name                   = string
    configuration_type             = string
    firelens_configuration_options = map(string)
  })
}
variable "ecs_object_config" {
  type = object({
    container_port                  = number
    protocol                        = string
    app_count                       = number
    fargate_version                 = string
    fargate_cpu                     = string
    fargate_memory                  = string
    auto_scaling_max_capacity       = number
    service_health_check_path       = string
    aws_log_group_retention_in_days = number
  })
}

variable "host_header" {
  type = object({
    inbound_host_header = set(string)
  })
}

variable "alb_listener_port" {
  type = object({
    port     = number
    protocol = string
  })
}

variable "api_gateway_configuration" {

}

variable "authorization_config" {

}

variable "api_gateway_vpc_endpoint_ids" {
  type    = list(string)
  default = []
}
