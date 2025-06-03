#!/bin/bash

# This script is used to display the user's name, and the files in their select directory
echo -n "Hello there, what's your name?: "
read name

echo -n "Nice to meet you $name, what directory would you like to list its files?: "
read directory

echo "Here are the files in $directory"
ls -l $directory