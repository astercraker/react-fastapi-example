variable "do_token" {
  description = "Token de API de DigitalOcean"
  type        = string
  sensitive   = true
}

variable "droplet_name" {
  description = "Nombre del droplet"
  type        = string
}

variable "region" {
  description = "Región de DigitalOcean"
  type        = string
}

variable "droplet_size" {
  description = "Slug del tamaño del droplet"
  type        = string
}

variable "ssh_fingerprint" {
  description = "Fingerprint de la SSH key registrada en DigitalOcean"
  type        = string
}

variable "repo_url" {
  description = "URL HTTPS del repositorio a clonar en el droplet"
  type        = string
}

variable "repo_branch" {
  description = "Branch del repositorio a desplegar"
  type        = string
  default     = "main"
}

variable "github_user" {
  description = "Usuario de GitHub, solo necesario si el repositorio es privado"
  type        = string
  default     = ""
}

variable "github_token" {
  description = "Token de GitHub con acceso de lectura, solo necesario si el repositorio es privado"
  type        = string
  default     = ""
  sensitive   = true
}

variable "db_cluster_name" {
  description = "Nombre del cluster de base de datos"
  type        = string
}

variable "db_size" {
  description = "Slug del tamaño del cluster de base de datos"
  type        = string
  default     = "db-s-1vcpu-1gb"
}

variable "db_name" {
  description = "Nombre de la base de datos de la aplicación"
  type        = string
}

variable "domain" {
  description = "Dominio público de la app (usado por Caddy para emitir el certificado TLS)"
  type        = string
}

variable "dashboard_user" {
  description = "Usuario para el basicauth del /dashboard en Caddy"
  type        = string
  default     = ""
}

variable "dashboard_pass_hash" {
  description = "Hash bcrypt (caddy hash-password) de la contraseña del /dashboard"
  type        = string
  default     = ""
  sensitive   = true
}
