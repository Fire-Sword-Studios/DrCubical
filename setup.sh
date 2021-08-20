#!/bin/bash
# Install required npm modules
npm install

FILE=.env
EXAMPLE_FILE=examples/.env

# Create .env file
touch "$FILE"

# Prompt user for .env values
while IFS="" read -r -u9 p || [ -n "$p" ]
do
  read -r -e -p "${p: : -1}" input
  echo "${p}${input}" >> "$FILE"
done 9< "$EXAMPLE_FILE"