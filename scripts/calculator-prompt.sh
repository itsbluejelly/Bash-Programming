#!/bin/bash
# The script is used to calculate values, via prompting for options and numbers

# Step 1: Declare variables
value="0"
menuChoice=""
totalNumbers=()

# A function to prompt the user for the menu option
promptMenu(){
    echo -ne "Hello there, what would you like to do.\n\t1. Addition\n\t2. Subtraction\n\t3. Multiplication\n\t4. Division\n\t5. Exit\nValue is ${value}: "
    read menuChoice

    if [[ ! "$menuChoice" =~ ^[12345]$ ]]; then
        echo -e "\n\t\tInvalid choice, the value must be in the range of 1-5 inclusive"
    fi
}

# A function to prompt the user for numbers
promptNumbers(){
    local count="0"

    while [[ ! "$count" =~ ^[1-9]+$ || "$count" -eq "0" ]]; do
        echo -ne "How many numbers would you like to have: "
        read count

        if [[ ! "$count" =~ ^[1-9]+$ || "$count" -eq "0" ]]; then
            echo "\n\tInvalid value, must be a number greater than 0"
        fi
    done

    for (( index=0; index < count; index++ )); do
        
    done
}

# Step 2: Start the program
while [[ ! "$menuChoice" =~ ^[12345]$ ]]; do
    promptMenu
done