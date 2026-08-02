resource "aws_security_group" "k8s_sg" {
  name        = "${var.project_name}-k8s-sg"
  description = "Security group for self-managed Kubernetes cluster"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description = "SSH from anywhere (for Ansible)"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Kubernetes API Server"
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow all internal VPC communication between nodes"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project_name}-k8s-sg" }
}

resource "aws_instance" "k8s_master" {
  ami                         = var.jenkins_ami
  instance_type               = var.node_instance_type
  key_name                    = data.aws_key_pair.jenkins.key_name
  subnet_id                   = module.vpc.public_subnets[0]
  vpc_security_group_ids      = [aws_security_group.k8s_sg.id]
  associate_public_ip_address = true

  root_block_device {
    volume_size           = 30
    volume_type           = "gp3"
    delete_on_termination = true
  }

  tags = {
    Name = "${var.project_name}-k8s-master"
    Role = "master"
  }
}

resource "aws_instance" "k8s_workers" {
  count                       = var.node_desired_size
  ami                         = var.jenkins_ami
  instance_type               = var.node_instance_type
  key_name                    = data.aws_key_pair.jenkins.key_name
  subnet_id                   = module.vpc.public_subnets[0]
  vpc_security_group_ids      = [aws_security_group.k8s_sg.id]
  associate_public_ip_address = true

  root_block_device {
    volume_size           = 30
    volume_type           = "gp3"
    delete_on_termination = true
  }

  tags = {
    Name = "${var.project_name}-k8s-worker-${count.index + 1}"
    Role = "worker"
  }
}
