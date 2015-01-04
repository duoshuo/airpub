#!/bin/bash

node_modules/.bin/lessc -x \
  bin/airpub-bootstrap.less \
  dist/bootstrap.min.css
