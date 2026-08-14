output "droplet_ip" {
  value = module.compute.public_ip
}

output "database_cluster_id" {
  value = module.database.cluster_id
}
