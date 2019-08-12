#!/bin/sh

find . -name '*.project' -exec rm -rf {} \;
find . -name '*.idea' -exec rm -rf {} \;
find . -name '*.iml' -exec rm -rf {} \;
find . -name 'bin' -exec rm -rf {} \;
find . -name 'target' -exec rm -rf {} \;
