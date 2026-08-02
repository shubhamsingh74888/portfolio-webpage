locals { ecr_repos = ["frontend", "backend"] }

resource "aws_ecr_repository" "this" {
  for_each             = toset(local.ecr_repos)
  name                 = "${var.project_name}-${each.key}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration { scan_on_push = true }
  encryption_configuration     { encryption_type = "AES256" }
}

resource "aws_ecr_lifecycle_policy" "this" {
  for_each   = toset(local.ecr_repos)
  repository = aws_ecr_repository.this[each.key].name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 10 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
      action = { type = "expire" }
    }]
  })
}
