#!/bin/sh

ENV=${CI_ENVIRONMENT_SLUG:-unknown}
APP=${CI_PROJECT_PATH_SLUG:-unknown}
NS=${KUBE_NAMESPACE:-default}

echo "Environment: ${ENV}"
echo "Namespace  : ${NS}"

cat <<EOB > backend.tf
terraform {
  backend "http" {
  }
}
EOB

cat << EOC > details.auto.tfvars
app_image = "${CI_REGISTRY_IMAGE:-ways-of-darkness-ng}"

domain = "${domain:-ways-of-darkness-ng.sonck.nl}"

environment = "${ENV}"
gitlab_app = "${APP}"

namespace = "${NS}"
EOC
