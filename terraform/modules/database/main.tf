terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }
}

resource "digitalocean_database_cluster" "this" {
  name       = var.cluster_name
  engine     = var.engine
  version    = var.engine_version
  size       = var.size
  region     = var.region
  node_count = var.node_count

  lifecycle {
    prevent_destroy = true
  }
}

resource "digitalocean_database_db" "app" {
  cluster_id = digitalocean_database_cluster.this.id
  name       = var.db_name
}

resource "digitalocean_database_firewall" "this" {
  count      = length(var.trusted_tags) > 0 ? 1 : 0
  cluster_id = digitalocean_database_cluster.this.id

  dynamic "rule" {
    for_each = var.trusted_tags
    content {
      type  = "tag"
      value = rule.value
    }
  }
}
