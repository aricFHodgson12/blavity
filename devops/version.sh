#!/usr/bin/env bash

VERSION=`date +"%y.%m.%d.%s"`
BRANCH=`git rev-parse --abbrev-ref HEAD`
COMMIT=`git rev-parse HEAD | cut -c1-10`
case $BRANCH in
  develop )
    EXTRA="-SNAPSHOT"
    ;;
  feature* )
    IFS='/'
    PARTS=( $BRANCH )
    EXTRA="-${PARTS[1]}"
    EXTRA=`echo $EXTRA | tr '[:lower:]' '[:upper:]'`
    ;;
  release* )
    EXTRA=""
    ;;
  * )
    # At this point we do not need to refer
    # to any commit hash since we'll have a
    # tag that represents the overall release
    EXTRA=""
    ;;
esac
echo $VERSION$EXTRA

exit 0
