#/bin/bash

set -e

REGION="ap-south-1"
ENV="prod"
APP="portfolio"

if [ ! -f .env ]; then
	echo " ERROR .env file not found. Create it first."
	exit 1
fi

export $(grep -v '^#' .env | xargs)

echo "Pushing secrets to AWS SSM parameter Store.."

aws ssm put-parameter \
	--name "/${APP}/${ENV}/MONGO_ROOT_USERNAME" \
	--value "$MONGO_ROOT_USERNAME" \
	--type "String" \
	--overwrite \
	--region $REGION

aws ssm put-parameter \
	--name "/${APP}/${ENV}/MONGO_ROOT_PASSWORD" \
	--value "$MONGO_ROOT_PASSWORD" \
	--type "SecureString" \
	--overwrite \
	--region $REGION

aws ssm put-parameter \
	--name "/${APP}/${ENV}/MONGO_DATABASE" \
	--value "$MONGO_DATABASE" \
	--type "String" \
	--overwrite \
	--region $REGION

aws ssm put-parameter \
	--name "/${APP}/${ENV}/JWT_SECRET" \
	--value "$JWT_SECRET" \
	--type "SecureString" \
	--overwrite \
	--region $REGION

aws ssm put-parameter \
	--name "/${APP}/${ENV}/MONGO_URI" \
	--value "$MONGO_URI" \
	--type "String" \
	--overwrite \
	--region $REGION 

aws ssm put-parameter \
	--name "/${APP}/${ENV}/jenkins_admin_user" \
	--value "$jenkins_admin_user" \
	--type "String" \
	--overwrite \
	--region $REGION


aws ssm put-parameter \
	--name "/${APP}/${ENV}/jenkins_admin_pass" \
	--value "$jenkins_admin_pass" \
	--overwrite \
	--type "SecureString" \
	--region $REGION

aws ssm put-parameter \
	--name "/${APP}/${ENV}/jenkins_smtp_user" \
	--value "$jenkins_smtp_user" \
	--type "String" \
	--overwrite \
	--region $REGION

aws ssm put-parameter \
	--name "/${APP}/${ENV}/jenkins_smtp_pass" \
	--value "$jenkins_smtp_pass" \
	--type "SecureString" \
	--overwrite \
	--region $REGION

aws ssm put-parameter \
	--name "/${APP}/${ENV}/github_token" \
	--value "$github_token" \
	--type "SecureString" \
	--overwrite \
	--region $REGION


aws ssm put-parameter \
	--name "/${APP}/${ENV}/dockerhub_user" \
	--value "$dockerhub_user" \
	--overwrite \
	--type "String" \
	--region $REGION

aws ssm put-parameter \
	--name "/${APP}/${ENV}/dockerhub_pass" \
	--value "$dockerhub_pass" \
	--type "SecureString" \
	--overwrite \
	--region $REGION

aws ssm put-parameter \
	--name "/${APP}/${ENV}/aws_access_key" \
	--value "$aws_access_key" \
	--type "String" \
	--overwrite \
	--region $REGION

aws ssm put-parameter \
	--name "/${APP}/${ENV}/aws_secret_key" \
	--value "$aws_secret_key" \
	--type "SecureString" \
	--overwrite \
	--region $REGION

aws ssm put-parameter \
	--name "/${APP}/${ENV}/sonar_token" \
	--value "$sonar_token" \
	--type "SecureString" \
	--overwrite \
	--region $REGION
 

aws ssm get-parameters-by-path \
	--path "/${APP}/${ENV}" \
	--region $REGION \
	--query "Parameters[].Name" \
	--output table

echo ""
echo "ALL secrets stored. You can now delete .env file"
