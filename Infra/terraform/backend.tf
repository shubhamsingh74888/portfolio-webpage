terraform {
  backend "s3" {
    bucket         = "portfolio-tfstate-439328746071"
    key            = "portfolio/production/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "portfolio-tf-locks"
    encrypt        = true
  }
}
