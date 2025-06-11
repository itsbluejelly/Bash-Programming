#!/bin/bash
# The script recursively counts from the specified number to the specified limit, based on whether or not it is above or below it

# Step 1: Initialize variables
echo "Starting script..."
number=""
limit=""

# Step 2: If valid params, initialise variables with them, format is -n <number> -l <limit>
parameters="$*"

if [[ "$parameters" =~ "-n "\w* ]]; then
    paramString="${parameters#*-n }"
    numberParam="${paramString%% *}"

    if [[ -n "$numberParam" && "$numberParam" =~ ^-?[0-9]+$ ]]; then
        number="$numberParam"
    fi
fi

if [[ "$parameters" =~ "-l "\w* ]]; then
    paramString="${parameters#*-l }"
    limitParam="${paramString%% *}"

    if [[ -n "$limitParam" && "$limitParam" =~ ^-?[0-9]+$ ]]; then
        limit="$limitParam"
    fi
fi

# Step 3: If no params, prompt for variables
while [[ -z "$number" || ! "$number" =~ ^-?[0-9]+$ ]]; do
    read -p "1. What's the starting number: " number

    if [[ ! "$number" =~ ^-?[0-9]+$ ]]; then
        echo -e "\t$number is not a valid number, please try again"
    fi
done

while [[ -z "$limit" || ! "$limit" =~ ^-?[0-9]+$ ]]; do
    read -p "2. What's the excluded limit to where we stop counting: " limit

    if [[ ! "$limit" =~ ^-?[0-9]+$ ]]; then
        echo -e "\t$limit is not a valid number, please try again"
    fi
done

# Step 4: Proceed with the count
echo "Counting from $number to $limit..."

if (( number < limit )); then
    while (( number < limit )); do
        echo "$number"
        number=$((number + 1))
    done
else
    while (( number > limit )); do
        echo "$number"
        number=$((number - 1))
    done
fi