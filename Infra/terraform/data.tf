# data.tf — reads all secrets from SSM, no values in code

# ── MongoDB ──────────────────────────────────────────────
data "aws_ssm_parameter" "mongo_root_username" {
  name            = "/portfolio/prod/MONGO_ROOT_USERNAME"
  with_decryption = true
}

data "aws_ssm_parameter" "mongo_root_password" {
  name            = "/portfolio/prod/MONGO_ROOT_PASSWORD"
  with_decryption = true
}

data "aws_ssm_parameter" "mongo_database" {
  name            = "/portfolio/prod/MONGO_DATABASE"
  with_decryption = true
}

data "aws_ssm_parameter" "mongo_uri" {
  name            = "/portfolio/prod/MONGO_URI"
  with_decryption = true
}

# ── App ──────────────────────────────────────────────────
data "aws_ssm_parameter" "jwt_secret" {
  name            = "/portfolio/prod/JWT_SECRET"
  with_decryption = true
}

# ── Jenkins ──────────────────────────────────────────────
data "aws_ssm_parameter" "jenkins_admin_user" {
  name            = "/portfolio/prod/jenkins_admin_user"
  with_decryption = true
}

data "aws_ssm_parameter" "jenkins_admin_pass" {
  name            = "/portfolio/prod/jenkins_admin_pass"
  with_decryption = true
}

data "aws_ssm_parameter" "jenkins_smtp_user" {
  name            = "/portfolio/prod/jenkins_smtp_user"
  with_decryption = true
}

data "aws_ssm_parameter" "jenkins_smtp_pass" {
  name            = "/portfolio/prod/jenkins_smtp_pass"
  with_decryption = true
}

# ── GitHub ───────────────────────────────────────────────
data "aws_ssm_parameter" "github_token" {
  name            = "/portfolio/prod/github_token"
  with_decryption = true
}

# ── DockerHub ────────────────────────────────────────────
data "aws_ssm_parameter" "dockerhub_user" {
  name            = "/portfolio/prod/dockerhub_user"
  with_decryption = true
}

data "aws_ssm_parameter" "dockerhub_pass" {
  name            = "/portfolio/prod/dockerhub_pass"
  with_decryption = true
}

# ── AWS ──────────────────────────────────────────────────
data "aws_ssm_parameter" "aws_access_key" {
  name            = "/portfolio/prod/aws_access_key"
  with_decryption = true
}

data "aws_ssm_parameter" "aws_secret_key" {
  name            = "/portfolio/prod/aws_secret_key"
  with_decryption = true
}

# ── SonarQube ────────────────────────────────────────────
data "aws_ssm_parameter" "sonar_token" {
  name            = "/portfolio/prod/sonar_token"
  with_decryption = true
}
