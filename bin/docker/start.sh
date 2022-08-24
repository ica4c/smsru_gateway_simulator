#!/usr/bin/env bash

set -e

if [[ -x "$(command -v docker)" ]]; then
    PROJECT_NAME="${PROJECT_NAME:-${PWD##*/}}"

    echo "Booting up ${PROJECT_NAME}";

    docker-compose -p ${PROJECT_NAME} \
       -f docker/docker-compose.yml \
       -f docker/docker-compose.development.yml \
       --project-directory=docker \
       build

   docker-compose -p ${PROJECT_NAME} \
       -f docker/docker-compose.yml \
       -f docker/docker-compose.development.yml \
       --project-directory=docker \
       up -d

   echo "Project: ${PROJECT_NAME} is now up and running...";
else
    echo "Docker is not installed. Please insure that docker is configured correctly before executing";
    exit 1;
fi