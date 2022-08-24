#!/usr/bin/env bash

if ![ -x "$(command -v docker)" ]; then
    echo "Docker is not installed. Please insure that docker is configured correctly before executing"
    exit 1;
fi

echo "Booting up project"

project=${PWD##*/}

docker-compose -p ${project} \
               -f docker/docker-compose.yml \
               -f docker/docker-compose.production.yml \
               --project-directory=docker build

docker-compose -p ${project} \
               -f docker/docker-compose.yml \
               -f docker/docker-compose.production.yml \
               --project-directory=docker up -d

exit 0;