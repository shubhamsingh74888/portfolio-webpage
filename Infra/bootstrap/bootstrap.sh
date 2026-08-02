#!/usr/bin/env bash
set -euo pipefail

# ── 1. Configuration ──────────────────────────────────────────────
AWS_REGION="ap-south-1"
PROJECT="portfolio"

# Automatically fetch the AWS Account ID so it is never hardcoded
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
BUCKET="${PROJECT}-tfstate-${AWS_ACCOUNT_ID}"
TABLE="${PROJECT}-tf-locks"

echo "=========================================="
echo " AWS Account ID : $AWS_ACCOUNT_ID"
echo " S3 Bucket      : $BUCKET"
echo " DynamoDB Table : $TABLE"
echo " Region         : $AWS_REGION"
echo "=========================================="
echo ""

# ── 2. Create S3 Bucket (Terraform State) ─────────────────────────
echo "⏳ Creating S3 bucket..."
if aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null; then
    echo "✅ S3 bucket $BUCKET already exists."
else
    aws s3 mb s3://$BUCKET --region $AWS_REGION

    # Enable versioning (crucial to recover from accidental state deletion)
    aws s3api put-bucket-versioning \
      --bucket $BUCKET \
      --versioning-configuration Status=Enabled

    # Block all public access (strict security for state files)
    aws s3api put-public-access-block \
      --bucket $BUCKET \
      --public-access-block-configuration \
        BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

    # Enable AES-256 encryption
    aws s3api put-bucket-encryption \
      --bucket $BUCKET \
      --server-side-encryption-configuration '{
        "Rules": [{
          "ApplyServerSideEncryptionByDefault": {
            "SSEAlgorithm": "AES256"
          }
        }]
      }'
    echo "✅ S3 bucket $BUCKET created and secured."
fi

# ── 3. Create DynamoDB Table (State Locking) ──────────────────────
echo ""
echo "⏳ Creating DynamoDB table..."
if aws dynamodb describe-table --table-name "$TABLE" --region $AWS_REGION >/dev/null 2>&1; then
    echo "✅ DynamoDB table $TABLE already exists."
else
    aws dynamodb create-table \
      --table-name $TABLE \
      --attribute-definitions AttributeName=LockID,AttributeType=S \
      --key-schema AttributeName=LockID,KeyType=HASH \
      --billing-mode PAY_PER_REQUEST \
      --region $AWS_REGION
    echo "✅ DynamoDB table $TABLE created."
fi

echo ""
echo "🎉 Bootstrap complete! Your AWS backend is ready for Terraform."
