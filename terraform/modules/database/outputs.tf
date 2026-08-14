output "cluster_id" {
  value = digitalocean_database_cluster.this.id
}

output "private_host" {
  value = digitalocean_database_cluster.this.private_host
}

output "port" {
  value = digitalocean_database_cluster.this.port
}

output "user" {
  value = digitalocean_database_cluster.this.user
}

output "password" {
  value     = digitalocean_database_cluster.this.password
  sensitive = true
}

output "database_url" {
  value     = "postgresql://${digitalocean_database_cluster.this.user}:${digitalocean_database_cluster.this.password}@${digitalocean_database_cluster.this.private_host}:${digitalocean_database_cluster.this.port}/${var.db_name}?sslmode=require"
  sensitive = true
}
