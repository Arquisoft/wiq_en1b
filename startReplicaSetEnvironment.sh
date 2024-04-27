#!/bin/bash

DELAY=10

docker compose --profile dev up --build

echo "****** Waiting for ${DELAY} seconds for containers to go up ******"
sleep $DELAY

docker exec mongodb /scripts/rs-init.sh