#!/bin/bash

rm -rf node_modules
ln -sf ../node_modules ./node_modules

# Copy package-lock back in case it has been updated by npm install
cp ../package-lock.json .
pm2-dev ecosystem.config.js
