#!/bin/bash

# This script checks if the command given exists. If so, it runs it, otherwise it prompts for confirmation to install and after it runs successfully, reruns the command
read -p "Welcome to the mock terminal: " command
executable="${command%% *}" # remove the long suffix, eg "hello you ppl" to "hello"

# Step 1: Check if it exists
if ! command -v "$executable"; then
    read -p "Command $executable does not exist. Would you like to install it? (Y/N): " choice

    if [[ "$choice" =~ ^Y|y$ ]]; then
        if sudo apt upgrade && sudo apt install "$executable"; then
            echo "Installed $executable successfully, running command..."
            $executable ${command#* }
        else
            echo "An error occured while installing $executable"
        fi
    else
        echo "Understood, exiting terminal..."
    fi
else
    echo "Command found, running it..."
    $executable ${command#* } # Remove short prefix, eg "hello you people" to "you people"
fi

