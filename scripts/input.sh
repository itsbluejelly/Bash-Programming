# !/bin/bash

# This script prompts the user for their name and a directory, then lists the files in that directory with the timestamp of when the script finalises.
echo -n "Hello there, what's your name?: "
read name

echo -n "Nice to meet you $name, what directory would you like to list its files?: "
read directory

echo "Here are the files in $directory"
ls -l $directory

echo "Script ran on $(date +"%B %d %Y at %I:%M %p")"