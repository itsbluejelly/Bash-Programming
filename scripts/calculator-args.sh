#!/bin/bash
# This script is used to calculate values via using the command line arguments

# Step 1: Declare the variables
numbers=()
total="0"
scale="3"

# Step 2: Set the scale first, as its a config param
params="$@"
tempString="${params#*--scale }"
scaleParam="${tempString%% *}"

if [[ -n "$scaleParam" && "$scaleParam" =~ ^[0-9]$ ]]; then
    scale="$scaleParam"
fi

# A function to add the numbers
addition(){
    for number in "${numbers[@]}"; do
        total=$(echo "$total+$number" | bc)
    done
}

# A function to subtract the numbers
subtraction(){
    for number in "${numbers[@]}"; do
        total=$(echo "$total-$number" | bc)
    done
}

# A function to multiply the numbers
multiplication(){
    for number in "${numbers[@]}"; do
        total=$(echo "$total*$number" | bc)
    done
}

# A function to divide the numbers
division(){
    for number in "${numbers[@]}"; do
        if (( number == 0 )); then
            echo -e "\nError: Division by zero is not allowed"
            exit 1
        fi
        
        total=$(echo "scale=$scale;$total/$number" | bc)
    done
}

# A function to read the comma separated values, eg '-a 2.3,4,7.000' and add them as numbers.
setNumbers(){
    local values=($(echo "$1" | tr ',' '\n'))

    if [[ -z "$values" ]]; then
        echo "No values provided for calculation"
        exit 1
    fi

    for value in "${values[@]}"; do
        if [[ ! "$value" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
            echo "$value in $1 is not a valid integer or float"
            exit 1
        fi

        numbers=("${numbers[@]}" "$value")
    done
}

# Step 2: Check params and ensure they are in these flags below:
# 1. '-a' for addition
# 2. '-s' for subtraction
# 3. '-d' for division
# 4. '-m' for multiplication
# 5. '--scale' for scale
while (( $# > 0 )); do
    # Initiate vars and number array
    flag="$1"
    values="$2"

    # Proceed only when not observing the scale tag, to handle calculations
    if [[ ! "$flag" == "--scale" ]]; then
        setNumbers "$values"

        case "$flag" in
            -a) addition;;
            -s) subtraction;;
            -d) division;;
            -m) multiplication;;
            *) 
                echo -e "\n\tInvalid param, must either be '-a' '-s' '-d' or '-m'"
                exit 1
        esac
    fi

    # Reset the array and shift params in any given param
    numbers=()
    shift 2
done

# Step 3: Display result if successful
if (( $? == 0 )); then
    echo "The result is $total"
fi
