#!/bin/bash

node_modules/.bin/uglifyjs \
  src/airpub.admin.js \
  src/controllers/global.js \
  src/controllers/meta.js \
  src/controllers/admin.js \
  src/addons/meta.js \
  --mangle \
  --compress \
  -o dist/airpub-admin.min.js \
  --source-map dist/airpub-admin.min.js.map \
  --source-map-url airpub-admin.min.js.map 