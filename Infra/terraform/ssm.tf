# ssm.tf — creates all parameters in SSM
# Values come from terraform.tfvars (never hardcoded here)

resource "aws_ssm_parameter" "jenkins_admin_user" {
  name  = "/portfolio/prod/jenkins_admin_user"
  type  = "SecureString"
  value = var.jenkins_admin_user
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "jenkins_admin_pass" {
  name  = "/portfolio/prod/jenkins_admin_pass"
  type  = "SecureString"
  value = var.jenkins_admin_pass
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "jenkins_smtp_user" {
  name  = "/portfolio/prod/jenkins_smtp_user"
  type  = "SecureString"
  value = var.jenkins_smtp_user
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "jenkins_smtp_pass" {
  name  = "/portfolio/prod/jenkins_smtp_pass"
  type  = "SecureString"
  value = var.jenkins_smtp_pass
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "github_token" {
  name  = "/portfolio/prod/github_token"
  type  = "SecureString"
  value = var.github_token
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "dockerhub_user" {
  name  = "/portfolio/prod/dockerhub_user"
  type  = "String"
  value = var.dockerhub_user
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "dockerhub_pass" {
  name  = "/portfolio/prod/dockerhub_pass"
  type  = "SecureString"
  value = var.dockerhub_pass
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "sonar_token" {
  name  = "/portfolio/prod/sonar_token"
  type  = "SecureString"
  value = var.sonar_token
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "mongo_root_username" {
  name  = "/portfolio/prod/MONGO_ROOT_USERNAME"
  type  = "SecureString"
  value = var.mongo_root_username
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "mongo_root_password" {
  name  = "/portfolio/prod/MONGO_ROOT_PASSWORD"
  type  = "SecureString"
  value = var.mongo_root_password
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "mongo_database" {
  name  = "/portfolio/prod/MONGO_DATABASE"
  type  = "String"
  value = var.mongo_database
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "mongo_uri" {
  name  = "/portfolio/prod/MONGO_URI"
  type  = "SecureString"
  value = var.mongo_uri
  overwrite = true
  tags      = { Project = var.project_name }
}

resource "aws_ssm_parameter" "jwt_secret" {
  name  = "/portfolio/prod/JWT_SECRET"
  type  = "SecureString"
  value = var.jwt_secret
  overwrite = true
  tags      = { Project = var.project_name }
}
