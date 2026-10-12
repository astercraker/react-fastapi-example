terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  required_version = ">= 1.3.0"
}

provider "digitalocean" {
  token = var.do_token
}

# Experimento: Postgres corre como contenedor en el droplet (docker-compose.db.yml)
# en vez de un cluster administrado de DigitalOcean.
resource "random_password" "postgres" {
  length  = 32
  special = false # se usa dentro de DATABASE_URL y del .env de compose
}

module "compute" {
  source = "../../modules/compute"

  name            = var.droplet_name
  region          = var.region
  size            = var.droplet_size
  ssh_fingerprint = var.ssh_fingerprint
  tags            = ["react-fastapi-example", "dev"]
  use_reserved_ip = true

  repo_url     = var.repo_url
  repo_branch  = var.repo_branch
  github_user  = var.github_user
  github_token = var.github_token
  domain       = var.domain

  dashboard_user      = var.dashboard_user
  dashboard_pass_hash = var.dashboard_pass_hash

  postgres_password = random_password.postgres.result
  compose_files     = ["docker-compose.yml", "docker-compose.prod.yml", "docker-compose.db.yml"]
}
