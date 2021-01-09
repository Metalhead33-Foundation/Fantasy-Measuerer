locals {
  labels = {
    environment = var.environment
    application = "fantasy-measurer"
    customer = "metalhead33"
    "redmonitor.cofano.io/category" = "sites"
  }
  annotations = {
    "app.gitlab.com/app" = var.gitlab_app
    "app.gitlab.com/env" = var.environment
  }
  name = "${var.environment}-fantasy-measurer"
}

provider "kubernetes" {

}

resource "kubernetes_deployment" "wod" {
  metadata {
    name = local.name
    namespace = var.namespace
    labels = local.labels
    annotations = local.annotations
  }
  spec {
    selector {
      match_labels = local.labels
    }
    template {
      metadata {
        labels = local.labels
        annotations = local.annotations
      }
      spec {
        container {
          name = "main"
          image = "${var.app_image}:${var.app_version}"

          port {
            container_port = 8080
            name = "http"
            protocol = "TCP"
          }

          liveness_probe {
            http_get {
              path = "/"
              port = "http"
            }
          }
          readiness_probe {
            http_get {
              path = "/"
              port = "http"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "wod" {
  metadata {
    name = local.name
    labels = local.labels
    namespace = var.namespace
  }
  spec {
    type = "ClusterIP"
    port {
      port = 80
      target_port = "http"
      protocol = "TCP"
      name = "http"
    }
    selector = local.labels
  }
}

resource "kubernetes_ingress" "wod" {
  metadata {
    name = local.name
    namespace = var.namespace
    labels = local.labels
    annotations = {
      "kubernetes.io/ingress.class" = "nginx"
      "cert-manager.io/cluster-issuer" = "letsencrypt-sonck-prod"
    }
  }
  spec {
    rule {
      http {
        path {
          path = "/"
          backend {
            service_name = kubernetes_service.wod.metadata[0].name
            service_port = "http"
          }
        }
      }
      host = var.domain
    }
    tls {
      hosts = [var.domain]
      secret_name = "${replace(var.domain, ".", "-")}-tls"
    }
  }
}
