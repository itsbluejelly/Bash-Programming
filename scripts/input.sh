#!/bin/bash
# This script is meant to prompt for the sounds and animals

# Step 1: Check if params are okay, if so initialise with them
parameters="$@"
animalsParam=""
soundsParam=""
countParam=""

if [[ "$parameters" =~ "-a "* ]]; then
    tempString="${parameters#*-a }"
    validString="${tempString%% *}"

    if [[ "$validString" =~ ^[a-zA-Z]+(,[a-zA-Z]+)*$ ]]; then
        animalsParam="$validString"
    fi
fi

if [[ "$parameters" =~ "-s "* ]]; then
    tempString="${parameters#*-s }"
    validString="${tempString%% *}"

    if [[ "$validString" =~ ^[a-zA-Z]+(,[a-zA-Z]+)*$ ]]; then
        soundsParam="$validString"
    fi
fi

if [[ "$parameters" =~ "-c "* ]]; then
    tempString="${parameters#*-c }"
    validString="${tempString%% *}"

    if [[ "$validString" =~ ^[0-9]+$ ]]; then
        countParam="$validString"
    fi
fi

# Step 2: If the params are still empty, prompt for each

# Count
while (( countParam <= 0 )) && [[ -z "$animalsParam" || -z "$soundsParam" ]]; do
    read -p "1. How many animals would you like to enlist: " countParam

    if (( countParam <= 0 )); then
        echo -e "The count $countParam must be greater than 0"
    fi
done

# Animals
if [[ -z "$animalsParam" ]]; then
    echo "2. Animals"

    for((count=1; count <= countParam; count++)); do
        animal=""

        while [[ -z "$animal" ]]; do
            echo -n "  $count. What is your animal: "
            read animal

            if [[ -z "$animal" ]]; then
                echo -e "\t\tYou must fill an animal"
            fi
        done

        if [[ -z "$animalsParam" ]]; then
            animalsParam="$animal"
        else
            animalsParam="$animalsParam,$animal"
        fi
    done
fi

# Sounds
if [[ -z "$soundsParam" ]]; then
    echo "3. Sounds"

    for((count=1; count <= countParam; count++)); do
        sound=""

        while [[ -z "$sound" ]]; do
            echo -n "  $count. What is your sound: "
            read sound

            if [[ -z "$sound" ]]; then
                echo -e "\t\tYou must fill an sound"
            fi
        done

        if [[ -z "$soundsParam" ]]; then
            soundsParam="$sound"
        else
            soundsParam="$soundsParam,$sound"
        fi
    done
fi

# Step 3: Write to the file with the new info
if ./scripts/logfile.sh -a "$animalsParam" -s "$soundsParam"; then
    echo "Animals added successfully, you can view the input at the log file path given"
else
    echo "It appears an error occured, exiting script"
    exit
fi