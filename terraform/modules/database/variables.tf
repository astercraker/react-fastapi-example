variable "cluster_name" {
  description = "Nombre del cluster de base de datos"
  type        = string
}

variable "region" {
  description = "Región de DigitalOcean"
  type        = string
}

variable "size" {
  description = "Slug del tamaño del cluster"
  type        = string
  default     = "db-s-1vcpu-1gb"
}

variable "engine" {
  description = "Motor de base de datos"
  type        = string
  default     = "pg"
}

variable "engine_version" {
  description = "Versión del motor"
  type        = string
  default     = "16"
}

variable "node_count" {
  description = "Número de nodos del cluster"
  type        = number
  default     = 1
}

variable "db_name" {
  description = "Nombre de la base de datos de la aplicación"
  type        = string
}

variable "trusted_tags" {
  description = "Tags de DigitalOcean autorizados a conectarse al cluster vía firewall"
  type        = list(string)
  default     = []
}
