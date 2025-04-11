output "role_arn" {
  value = aws_iam_role.role.arn
}

output "role_policy_arn" {
  value = aws_iam_role_policy.role_policy.id
}