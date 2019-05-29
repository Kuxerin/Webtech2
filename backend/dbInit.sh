#!/bin/bash

MONGO_HOST_IP=172.21.0.10
MONGO_NETWORK_MASK=172.21.0.0/16
MONGO_NETWORK_NAME=mongodb-network

docker network create -d bridge --subnet $MONGO_NETWORK_MASK $MONGO_NETWORK_NAME
docker run --detach --network $MONGO_NETWORK_NAME --ip $MONGO_HOST_IP mongo

chmod +r data/*.json

mongoimport --host $MONGO_HOST_IP --db assignment --collection shutter_colors   --file src/db/testData/testColors.json   --jsonArray
mongoimport --host $MONGO_HOST_IP --db assignment --collection shutter_mats     --file src/db/testData/testMats.json     --jsonArray
mongoimport --host $MONGO_HOST_IP --db assignment --collection orders           --file src/db/testData/testOrders.json   --jsonArray

mongo --host $MONGO_HOST_IP
