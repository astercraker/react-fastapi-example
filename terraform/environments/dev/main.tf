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

module "compute" {
  source = "../../modules/compute"

  name            = var.droplet_name
  region          = var.region
  size            = var.droplet_size
  ssh_fingerprint = var.ssh_fingerprint
  tags            = ["react-fastapi-example", "dev"]
  use_reserved_ip = false

  repo_url     = var.repo_url
  repo_branch  = var.repo_branch
  github_user  = var.github_user
  github_token = var.github_token
}
