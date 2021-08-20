#!/bin/bash
# Install required npm modules
npm install

FILE=.env
EXAMPLE_FILE=examples/.env

# Create .env file
if ! [[ -s "$FILE" ]]; then
	cp "$EXAMPLE_FILE" "$FILE"
fi


# Prompt user for .env values
COMMAND='read -r -p "Type a value for \"\1\" `if [ -n "\2" ]; then echo " (PREVIOUS: "\2" leave empty for unchanged)"; fi`: " input; if [ -n "$input" ]; then echo \1=$input; else echo \1=\2; fi'

sed -i "s/^\([A-Z_]\+\)=\(.*\)$/$COMMAND/e" "$FILE"
