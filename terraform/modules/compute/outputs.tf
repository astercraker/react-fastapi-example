output "droplet_id" {
  value = digitalocean_droplet.this.id
}

output "droplet_ip" {
  value = digitalocean_droplet.this.ipv4_address
}

output "public_ip" {
  value = var.use_reserved_ip ? digitalocean_reserved_ip.this[0].ip_address : digitalocean_droplet.this.ipv4_address
}
