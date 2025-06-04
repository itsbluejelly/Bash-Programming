#!/bin/bash

# This script takes in a file path and checks whether or not it exists, while displaying its type
# Step 1: Prompt for file path
read -p "What is the file path: " filePath

# Step 2: Check the filepath details
if [[ -e "$filePath" ]]; then
    if [[ -f "$filePath" ]]; then
        echo "Path $filePath is a normal file"
    elif [[ -d "$filePath" ]]; then
        echo "Path $filePath is a directory"
    else
        echo "Path $filePath is a symlink"
    fi

    echo "It has the following permissions: $(ls -la "$filePath" | head -n 2 | tail -n 1 | cut -b 1-10 )"
else
    echo "Path '$filePath' does not exist"
fi