#!/bin/bash
# The script is used to calculate values, via prompting for options and numbers

# Step 1: Declare variables
value="0"
menuChoice=""
totalNumbers=()

# A function to prompt the user for the menu option
promptMenu(){

    while [[ ! "$menuChoice" =~ ^[123456]$ ]]; do
        echo -ne "Hello there, what would you like to do.\n\t1. Addition\n\t2. Subtraction\n\t3. Multiplication\n\t4. Division\n\t5. Clear history\n\t6. Exit\nValue is ${value}: "
        read menuChoice

        if [[ ! "$menuChoice" =~ ^[123456]$ ]]; then
            echo -e "\n\t\tInvalid choice, the value must be in the range of 1-6 inclusive"
        fi
    done
}

# A function to prompt the user for numbers
promptNumbers(){
    local count="0"

    while [[ ! "$count" =~ ^[1-9]+$ || "$count" -eq "0" ]]; do
        read -p "How many numbers would you like to have: " count

        if [[ ! "$count" =~ ^[1-9]+$ || "$count" -eq "0" ]]; then
            echo -e "\n\tInvalid value, must be a number greater than 0"
        fi
    done

    for (( index=1; index <= count; index++ )); do
        local number=""

        while [[ ! "$number" =~ ^[0-9]+(\.[0-9]+)?$ ]]; do
            read -p "$index. What is the number in position $index: " number

            if [[ ! "$number" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
                echo -e "\n\tInvalid value, must be a number"
            else
                totalNumbers=("${totalNumbers[@]}" "$number")
            fi
        done
    done
}

# A function to clear history
clearHistory(){
    value="0"
    echo -e "History cleared\n"
}

# A function to reset the calculator
resetCalculator(){
    totalNumbers=()
    menuChoice=""
}

# A function to add the numbers
addition(){
    for number in "${totalNumbers[@]}"; do
        value=$(echo "$value+$number" | bc)
    done
}

# A function to subtract the numbers
subtraction(){
    for number in "${totalNumbers[@]}"; do
        value=$(echo "$value-$number" | bc)
    done
}

# A function to multiply the numbers
multiplication(){
    for number in "${totalNumbers[@]}"; do
        value=$(echo "$value*$number" | bc)
    done
}

# A function to divide the numbers
division(){
    local scale=""

    while [[ ! "$scale" =~ ^[0-9]$ ]]; do
        read -p "How many decimal places would you like the result to be rounded off to: " scale

        if [[ ! "$scale" =~ ^[0-9]$ ]]; then
            echo -e "\n\tInvalid value, it should be between 0-9 inclusive"
        fi
    done

    for number in "${totalNumbers[@]}"; do
        if (( number == 0 )); then
            echo -e "\n\tError: Division by zero is not allowed"
            return 1
        fi
        
        value=$(echo "scale=$scale;$value/$number" | bc)
    done
}

# Step 2: Start the program
while [[ ! "$menuChoice" =~ ^[123456]$ ]]; do
    promptMenu

    # Exit where necessary
    if [[ "$menuChoice" == "6" ]]; then
        echo "Thanks for using the calculator"
        exit 0
    elif [[ "$menuChoice" == "5" ]]; then
        clearHistory

        # Reset calc to trigger loop
        resetCalculator
    else
        # Prompt and handle cases
        promptNumbers
        
        case "$menuChoice" in
            1) addition;;
            2) subtraction;;
            3) multiplication;;
            4) division;;
            *) echo -e "\n\tInvalid choice given, must be in the range 1-4 inclusive"
        esac
        
        # Reset calc to trigger loop
        resetCalculator
    fi
done