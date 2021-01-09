locals {
  labels = {
    environment = var.environment
    app = "fantasy-measurer"
    "redmonitor.cofano.io/application" = "Fantasy-Measurer"
    "redmonitor.cofano.io/customer" = "metalhead33"
  }
  annotations = {
    "app.gitlab.com/app" = var.gitlab_app
    "app.gitlab.com/env" = var.environment
  }
  name = "${var.environment}-fantasy-measurer"
}

resource "kubernetes_deployment" "fantasy-measurer" {
  metadata {
    name = local.name
    namespace = var.namespace
    labels = local.labels
    annotations = local.annotations
  }
  spec {
    revision_history_limit = 1
    template {
      metadata {
        labels = local.labels
        annotations = local.annotations
      }
      spec {
        container {
          image_pull_policy = "Always"
          name = "main"
          image = "registry.git.sonck.nl/metalhead33/ways-of-darkness/fantasy-measurer:latest"
          port {
            container_port = 8080
            name = "http"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "fantasy-measurer" {
  metadata {
    name = local.name
    namespace = var.namespace
    labels = local.labels
  }
  spec {
    selector = local.labels
    port {
      port = 80
      target_port = "http"
    }
  }
}

resource "kubernetes_ingress" "fantasy-measurer" {
  metadata {
    name = local.name
    namespace = var.namespace
    labels = local.labels
  }
  spec {
    rule {
      host = "ways-of-darkness.sonck.nl"
      http {
        path {
          path = "fantasy-measurer"
          backend {
            service_name = kubernetes_service.fantasy-measurer.metadata[0].name
            service_port = kubernetes_service.fantasy-measurer.spec[0].port[0].port
          }
        }
      }
    }
  }
}