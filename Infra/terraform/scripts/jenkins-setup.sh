#!/bin/bash
set -e

# ── Mount EBS for Jenkins home ────────────────────────
DEVICE="/dev/nvme1n1"
MOUNT="/var/lib/jenkins"

# Wait for device to attach (up to 60s)
for i in $(seq 1 12); do
  [ -b "$DEVICE" ] && break
  echo "Waiting for EBS device $DEVICE... ($i/12)"
  sleep 5
done

if [ -b "$DEVICE" ]; then
  # Format only if no filesystem exists
  if ! blkid "$DEVICE" | grep -q ext4; then
    echo "Formatting $DEVICE..."
    mkfs.ext4 "$DEVICE"
  fi

  mkdir -p "$MOUNT"
  mount "$DEVICE" "$MOUNT"

  # Persist mount across reboots
  grep -q "$DEVICE" /etc/fstab || \
    echo "$DEVICE  $MOUNT  ext4  defaults,nofail  0  2" >> /etc/fstab

  echo "EBS mounted at $MOUNT"
else
  echo "WARNING: EBS device $DEVICE not found, skipping mount"
fi

REGION="ap-south-1"

echo "Fetching secrets from SSM..."

mkdir -p /etc/portfolio

aws ssm get-parameter \
  --name "/portfolio/prod/jenkins_admin_user" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/jenkins_admin_user

aws ssm get-parameter \
  --name "/portfolio/prod/jenkins_admin_pass" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/jenkins_admin_pass

aws ssm get-parameter \
  --name "/portfolio/prod/jenkins_smtp_user" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/jenkins_smtp_user

aws ssm get-parameter \
  --name "/portfolio/prod/jenkins_smtp_pass" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/jenkins_smtp_pass

aws ssm get-parameter \
  --name "/portfolio/prod/github_token" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/github_token

aws ssm get-parameter \
  --name "/portfolio/prod/dockerhub_user" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/dockerhub_user

aws ssm get-parameter \
  --name "/portfolio/prod/dockerhub_pass" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/dockerhub_pass

aws ssm get-parameter \
  --name "/portfolio/prod/sonar_token" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/sonar_token

aws ssm get-parameter \
  --name "/portfolio/prod/MONGO_ROOT_USERNAME" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/MONGO_ROOT_USERNAME

aws ssm get-parameter \
  --name "/portfolio/prod/MONGO_ROOT_PASSWORD" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/MONGO_ROOT_PASSWORD

aws ssm get-parameter \
  --name "/portfolio/prod/MONGO_DATABASE" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/MONGO_DATABASE

aws ssm get-parameter \
  --name "/portfolio/prod/MONGO_URI" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/MONGO_URI

aws ssm get-parameter \
  --name "/portfolio/prod/JWT_SECRET" \
  --with-decryption \
  --query "Parameter.Value" \
  --output text \
  --region $REGION > /etc/portfolio/JWT_SECRET

# Only root can read these files
chmod 600 /etc/portfolio/*
chmod 700 /etc/portfolio

echo "Done. Secrets available in /etc/portfolio/ for Ansible."
