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
  default = "~/.ssh/portfolio-key.pub"
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
