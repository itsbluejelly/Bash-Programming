#!/bin/bash

# This script takes in a value, its type and the compared value, then checks if they are equal, greater than, or less than.
# Step 1: Prompt for values
read -p "What is the value: " value
read -p "What is the compared value: " comparedValue

# Step 2: Prompt for value type
read -p "What is the value type (int, string): " valueType

if [[ ! "$valueType" =~ ^(int|string)$ ]]; then
    echo "Invalid value type. Please enter 'int' or 'string'."
    exit 1
fi

# Step 3: Compare based on the types
if [[ "$valueType" == "int" ]]; then
    if (( value > comparedValue )); then
        echo "$value is greater than $comparedValue"
    elif (( value < comparedValue )); then
        echo "$value is less than $comparedValue"
    else
        echo "$value and $comparedValue are equal"
    fi
else
    if [[ "$value" == "$comparedValue" ]]; then
        echo "$value and $comparedValue are equal"
    elif [[ "$value" =~ $comparedValue ]]; then
        echo "$value contains $comparedValue"
    else
        echo "$value and $comparedValue are not equal"
    fi
fi
 