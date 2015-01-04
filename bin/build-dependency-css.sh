#!/bin/bash

node_modules/.bin/cleancss \
  dist/airpub-bootstrap.min.css \
  bower_components/nprogress/nprogress.css \
  bower_components/highlightjs/styles/github.css \
  -o dist/airpub-dependencies.min.css \
  --s0 \
  --debug