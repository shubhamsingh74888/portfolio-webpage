# Create EBS volume in same AZ as Jenkins instance
resource "aws_ebs_volume" "jenkins_data" {
  availability_zone = aws_instance.jenkins.availability_zone
  size              = 20        # GB — adjust as needed
  type              = "gp3"
  encrypted         = true

  tags = {
    Name = "jenkins-data"
  }
}

# Attach to Jenkins instance
resource "aws_volume_attachment" "jenkins_data" {
  device_name  = "/dev/xvdf"
  volume_id    = aws_ebs_volume.jenkins_data.id
  instance_id  = aws_instance.jenkins.id

  # CRITICAL: don't destroy volume when detaching
  skip_destroy = true
}
