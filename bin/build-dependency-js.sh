#!/bin/bash

node_modules/.bin/uglifyjs \
  bower_components/angular/angular.min.js \
  bower_components/angular-bootstrap/ui-bootstrap.min.js \
  bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js \
  bower_components/angular-ui-router/release/angular-ui-router.min.js \
  bower_components/oclazyload/dist/ocLazyLoad.min.js \
  bower_components/nprogress/nprogress.js \
  bower_components/duoshuo/dist/duoshuo.min.js \
  bower_components/upyun/dist/upyun.min.js \
  bower_components/node-uuid/uuid.js \
  bower_components/marked/lib/marked.js \
  bower_components/highlightjs/highlight.pack.js \
  bower_components/wechat.js/wechat.js \
  --mangle \
  --compress \
  -o dist/airpub-dependencies.min.js \
  --source-map dist/airpub-dependencies.min.js.map \
  --source-map-url airpub-dependencies.min.js.map