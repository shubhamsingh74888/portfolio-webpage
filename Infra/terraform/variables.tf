variable "aws_region" {
  type    = string
  default = "ap-south-1"
}

variable "aws_account_id" {
  type = string
}

variable "project_name" {
  type    = string
  default = "portfolio"
}

variable "environment" {
  type    = string
  default = "production"
}

variable "node_instance_type" {
  type    = string
  default = "t3.medium"
}

variable "node_min_size" {
  type    = number
  default = 1
}

variable "node_max_size" {
  type    = number
  default = 2
}

variable "node_desired_size" {
  type    = number
  default = 1
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "jenkins_public_key_path" {
  type    = string
  default = "~/.ssh/instance1-key.pub"
}

variable "jenkins_ami" {
  type    = string
  default = "ami-0f58b397bc5c1f2e8"
}

variable "jenkins_instance_type" {
  type    = string
  default = "t3.medium"
}

variable "your_ip_cidr" {
  type = string
}

variable "key_pair_name" {
  type = string
  default = "instance1-key"
}

# ── SSM secret values (set in terraform.tfvars) ──────────
variable "jenkins_admin_user" {
  type = string
}
variable "jenkins_admin_pass" {
  type      = string
  sensitive = true
}
variable "jenkins_smtp_user" {
  type = string
}
variable "jenkins_smtp_pass" {
  type      = string
  sensitive = true
}
variable "github_token" {
  type      = string
  sensitive = true
}
variable "dockerhub_user" {
  type = string
}
variable "dockerhub_pass" {
  type      = string
  sensitive = true
}
variable "sonar_token" {
  type      = string
  sensitive = true
}
variable "mongo_root_username" {
  type = string
}
variable "mongo_root_password" {
  type      = string
  sensitive = true
}
variable "mongo_database" {
  type = string
}
variable "mongo_uri" {
  type      = string
  sensitive = true
}
variable "jwt_secret" {
  type      = string
  sensitive = true
}
