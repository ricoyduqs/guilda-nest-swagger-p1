resource "aws_iam_role" "role" {
  name               = "service-${var.application}-${var.env}-role"
  description        = "role ecs task execution"
  assume_role_policy = file("./modules/ecs/policies/ecs-role.json")
}

resource "aws_iam_role_policy" "role_policy" {
  name   = "service-${var.application}-${var.env}-policy"
  policy = file("./modules/ecs/policies/ecs-role-policy.json")
  role   = aws_iam_role.role.id
}
