data "aws_vpc" "main" {
  filter {
    name   = "tag:Name"
    values = ["${var.general_config.project}-vpc"]
  }
}

data "aws_subnets" "privates" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.main.id]
  }
  tags = {
    Tier = "private"
  }
}

data "aws_lb" "alb" {
  tags = {
    Name = "alb-${var.general_config.project}-${var.general_config.env}"
  }
}

data "aws_acm_certificate" "cert" {
  domain   = "scientia.estacio${var.general_config.env}.net"
  statuses = ["ISSUED"]
}


data "aws_ecr_repository" "strapi" {
  name = "${var.general_config.application}-${var.general_config.env}"
}

data "aws_route53_zone" "this" {
  name = "scientia.estacio${var.general_config.env}.net"
}

data "aws_ecs_cluster" "ecs_scientia" {
  cluster_name = "cluster-${var.general_config.project}-${var.general_config.env}"
}
