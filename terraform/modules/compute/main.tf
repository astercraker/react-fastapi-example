terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }
}

resource "digitalocean_droplet" "this" {
  name     = var.name
  region   = var.region
  size     = var.size
  image    = var.image
  ssh_keys = [var.ssh_fingerprint]
  tags     = var.tags

  user_data = templatefile("${path.module}/scripts/deploy.sh.tftpl", {
    repo_url     = var.repo_url
    repo_branch  = var.repo_branch
    github_user  = var.github_user
    github_token = var.github_token
    deploy_path  = var.deploy_path
    database_url        = var.database_url
    domain              = var.domain
    dashboard_user      = var.dashboard_user
    dashboard_pass_hash = var.dashboard_pass_hash
  })
}

resource "digitalocean_reserved_ip" "this" {
  count  = var.use_reserved_ip ? 1 : 0
  region = var.region
}

resource "digitalocean_reserved_ip_assignment" "this" {
  count      = var.use_reserved_ip ? 1 : 0
  ip_address = digitalocean_reserved_ip.this[0].ip_address
  droplet_id = digitalocean_droplet.this.id
}

resource "digitalocean_firewall" "this" {
  name        = "${var.name}-fw"
  droplet_ids = [digitalocean_droplet.this.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = var.allowed_ssh_ips
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}
