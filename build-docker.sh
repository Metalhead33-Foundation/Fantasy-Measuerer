#!/bin/sh -v

on_fail() {
  buildah rm "${C}"
  exit 2
}

VERSION="latest"

C=$(buildah from halverneus/static-file-server:v1.7.2)

buildah copy "${C}" "${PWD}/build" /web || on_fail

buildah commit "${C}" "$1:$VERSION" || on_fail
buildah push "$1:$VERSION" "docker://$1:$VERSION" || on_fail
buildah rm "${C}"
