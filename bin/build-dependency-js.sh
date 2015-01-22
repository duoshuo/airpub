#!/bin/bash

node_modules/.bin/uglifyjs \
  bower_components/angular/angular.min.js \
  bower_components/angular-sanitize/angular-sanitize.min.js \
  libs/ui-bootstrap-custom-0.12.0.min.js \
  libs/ui-bootstrap-custom-tpls-0.12.0.min.js \
  bower_components/angular-ui-router/release/angular-ui-router.min.js \
  bower_components/oclazyload/dist/ocLazyLoad.min.js \
  bower_components/nprogress/nprogress.js \
  bower_components/duoshuo/dist/duoshuo.min.js \
  bower_components/upyun/dist/upyun.min.js \
  --mangle \
  --compress \
  -o dist/airpub-dependencies.min.js \
  --source-map dist/airpub-dependencies.min.js.map \
  --source-map-url airpub-dependencies.min.js.map