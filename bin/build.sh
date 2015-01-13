#!/bin/bash

node_modules/.bin/uglifyjs \
  src/airpub.js \
  src/filters/marked.js \
  src/services/share.js \
  src/controllers/global.js \
  src/controllers/meta.js \
  src/controllers/base.js \
  src/controllers/archive.js \
  src/controllers/single.js \
  src/controllers/admin.js \
  src/addons/meta.js \
  --mangle \
  --compress \
  -o dist/airpub.min.js \
  --source-map dist/airpub.min.js.map \
  --source-map-url airpub.min.js.map 