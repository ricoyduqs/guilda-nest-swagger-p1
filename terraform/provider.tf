terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.66"

    }
  }

  backend "s3" {
    bucket = "tfstate-infra-base-dev"
    key    = "scientia/guilda/swagger.tfstate"
    region = "us-east-1"
  }

}

provider "aws" {
  region = var.general_config.region

  default_tags {
    tags = {
      Environment = upper(var.general_config.env)
      Application = upper(var.general_config.application)
      Account     = upper(var.general_config.project)
      Terraform   = "TRUE"
      Team        = upper(var.general_config.application)
    }
  }
}
