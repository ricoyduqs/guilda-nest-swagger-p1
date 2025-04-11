locals {
  api_name = "api-${var.application}-${var.env}-${var.api_gateway_configuration.api_type}"
}

resource "aws_api_gateway_rest_api" "api" {
  name                         = local.api_name
  api_key_source               = var.api_gateway_configuration.api_key_source
  disable_execute_api_endpoint = var.api_gateway_configuration.disable_execute_api_endpoint
  policy                       = var.api_gateway_configuration.api_gateway_policy

  body = jsonencode("${path.root}/swagger.json")

  endpoint_configuration {
    types            = [for values in var.api_gateway_configuration.api_endpoint_type : upper(values)]
    vpc_endpoint_ids = var.api_gateway_configuration.api_type == "private" ? var.api_gateway_vpc_endpoint_ids : null
  }

  tags = {
    Name = local.api_name
    Tier = "${var.api_gateway_configuration.api_type}"
  }
}

resource "aws_api_gateway_stage" "deploy_stage" {
  deployment_id = aws_api_gateway_deployment.deploy_api.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = var.api_gateway_configuration.deploy_api_stage_name
}

resource "aws_api_gateway_deployment" "deploy_api" {

  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode([aws_api_gateway_rest_api.api.body]))
  }

  lifecycle {
    create_before_destroy = true
  }

}

# resource "aws_api_gateway_authorizer" "this" {
#   for_each = {
#     for conf in var.authorization_config : conf.authorization_name => conf if conf.is_there_authorizer
#   }

#   name                   = each.value.authorization_name
#   rest_api_id            = aws_api_gateway_rest_api.api.id
#   authorizer_uri         = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:${var.aws_account_id}:function:${each.value.authorization_name}/invocations"
#   type                   = each.value.authorization_type
#   identity_source        = each.value.identity_source
#   authorizer_credentials = "arn:aws:iam::${var.aws_account_id}:role/${each.value.authorizer_role_name}"
# }

resource "aws_api_gateway_domain_name" "api_gateway_domain_name" {

  domain_name = "${var.api_gateway_configuration.subdomain_name}.${var.domain_name}"

  certificate_arn          = var.api_gateway_configuration.api_gateway_dns_type == "EDGE" ? var.acm_certificate_arn : null
  regional_certificate_arn = var.api_gateway_configuration.api_gateway_dns_type == "REGIONAL" ? var.acm_certificate_arn : null

  security_policy = "TLS_1_2"

  endpoint_configuration {
    types = [var.api_gateway_configuration.api_gateway_dns_type]
  }

}

resource "aws_api_gateway_base_path_mapping" "path_mapping" {

  api_id      = aws_api_gateway_rest_api.api.id
  stage_name  = aws_api_gateway_stage.deploy_stage.stage_name
  domain_name = aws_api_gateway_domain_name.api_gateway_domain_name.domain_name
}

resource "aws_route53_record" "example" {

  name    = aws_api_gateway_domain_name.api_gateway_domain_name.domain_name
  type    = "A"
  zone_id = var.route53_zone_id

  alias {
    evaluate_target_health = true
    name                   = var.api_gateway_configuration.api_gateway_dns_type == "EDGE" ? aws_api_gateway_domain_name.api_gateway_domain_name.cloudfront_domain_name : var.api_gateway_configuration.api_gateway_dns_type == "REGIONAL" ? aws_api_gateway_domain_name.api_gateway_domain_name.regional_domain_name : ""
    zone_id                = var.api_gateway_configuration.api_gateway_dns_type == "EDGE" ? aws_api_gateway_domain_name.api_gateway_domain_name.cloudfront_zone_id : var.api_gateway_configuration.api_gateway_dns_type == "REGIONAL" ? aws_api_gateway_domain_name.api_gateway_domain_name.regional_zone_id : ""
  }
}
