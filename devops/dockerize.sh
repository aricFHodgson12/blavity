#!/usr/bin/env bash
# A script to build and publish docker images for the project.

# Ensure that this script operates from the directory in which it resides
cd "$(dirname "$0")"

ORG=blavityinc
PKG=${PWD##*/}

######### DO NOT EDIT BELOW THIS LINE #########

version=$1

if [ -z "$version" ] || ! [[ $version =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+(-.*)?$ ]]; then
  echo "Please provide a valid version number"
  exit 1
else
  # Determine all the docker tags to publish
  major=$(echo ${version} | cut -d . -f 1)
  minor=$(echo ${version} | cut -d . -f 2)
  patch=$(echo ${version} | cut -d . -f 3 | cut -d '-' -f 1)
  suffix=$(echo ${version} | cut -d '-' -f 2-)
  if [[ "$suffix" == "$version" ]]; then
    suffix=""
    tags="latest " # No suffix indicates we should push a latest tag
  else
    suffix="-"$suffix
    tags=""
  fi

  tags="$tags$major$suffix $major.$minor$suffix $major.$minor.$patch$suffix"

  # Build the main docker image
  image=$(date +%Y%m%d%H%M%S)
  docker build -t $image -f Dockerfile .

  # Push the image to docker hub with each of the tags
  docker login -u $DOCKER_USER -p $DOCKER_PASS 
  for tag in $tags; do
    for type in " "; do
      name=$ORG/$PKG:$tag$type
      docker tag $image$type $name
      docker push $name
      echo "Pushed $name"
    done
  done
  exit 0
fi
