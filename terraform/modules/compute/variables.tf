variable "name" {
  description = "Nombre del droplet"
  type        = string
}

variable "region" {
  description = "Región de DigitalOcean"
  type        = string
}

variable "size" {
  description = "Slug del tamaño del droplet"
  type        = string
}

variable "image" {
  description = "Imagen base del droplet"
  type        = string
  default     = "ubuntu-22-04-x64"
}

variable "ssh_fingerprint" {
  description = "Fingerprint de la SSH key registrada en DigitalOcean"
  type        = string
}

variable "tags" {
  description = "Tags aplicados al droplet"
  type        = list(string)
  default     = []
}

variable "use_reserved_ip" {
  description = "Si es true, asigna una IP reservada (estática) al droplet"
  type        = bool
  default     = true
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

variable "deploy_path" {
  description = "Ruta en el droplet donde se clona el repositorio"
  type        = string
  default     = "/opt/app"
}

variable "allowed_ssh_ips" {
  description = "Rangos CIDR permitidos para conectarse por SSH"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "database_url" {
  description = "Cadena de conexión a la base de datos, inyectada como DATABASE_URL en el droplet"
  type        = string
  default     = ""
  sensitive   = true
}

variable "domain" {
  description = "Dominio público de la app, inyectado como DOMAIN para que Caddy emita el certificado TLS"
  type        = string
  default     = ""
}
