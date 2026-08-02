output "vpc_id" { value = module.vpc.vpc_id }
output "ecr_frontend_url" { value = aws_ecr_repository.this["frontend"].repository_url }
output "ecr_backend_url" { value = aws_ecr_repository.this["backend"].repository_url }
output "sns_topic_arn" { value = aws_sns_topic.alerts.arn }

output "jenkins_public_ip" { value = aws_instance.jenkins.public_ip }
output "jenkins_url" { value = "http://${aws_instance.jenkins.public_ip}:8080" }

output "k8s_master_public_ip" {
  description = "Public IP of the Kubernetes Master Node"
  value       = aws_instance.k8s_master.public_ip
}

output "k8s_workers_public_ips" {
  description = "Public IPs of the Kubernetes Worker Nodes"
  value       = aws_instance.k8s_workers[*].public_ip
}
