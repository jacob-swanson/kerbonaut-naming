#!/usr/bin/env bash

# Push build/ to the gh-pages branch

die() { echo "$@" 1>&2; exit 1; }

git subtree push --prefix build/ origin gh-pages || die "Failed to deploy"
