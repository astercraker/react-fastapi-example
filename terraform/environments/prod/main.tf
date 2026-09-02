terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  required_version = ">= 1.3.0"
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_tag" "db_access" {
  name = "${var.droplet_name}-db-access"
}

module "database" {
  source = "../../modules/database"

  cluster_name = var.db_cluster_name
  region       = var.region
  size         = var.db_size
  db_name      = var.db_name
  trusted_tags = [digitalocean_tag.db_access.name]
}

module "compute" {
  source = "../../modules/compute"

  name            = var.droplet_name
  region          = var.region
  size            = var.droplet_size
  ssh_fingerprint = var.ssh_fingerprint
  tags            = ["react-fastapi-example", "prod", digitalocean_tag.db_access.name]
  use_reserved_ip = true

  repo_url     = var.repo_url
  repo_branch  = var.repo_branch
  github_user  = var.github_user
  github_token = var.github_token
  database_url = module.database.database_url
  domain       = var.domain

  dashboard_user      = var.dashboard_user
  dashboard_pass_hash = var.dashboard_pass_hash
}
