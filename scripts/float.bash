# !/bin/bash

# This script takes 2 user-provided arguments, and performs math operations on them
# Step 1: Prompt for numbers
echo -n "1. Enter first number: "
read firstNumber

echo -n "2. Enter second number: "
read secondNumber

echo -n "3. How many decimal places: "
read decimalPlaces

# Step 2: Perform operations
addition=$(echo "scale=$decimalPlaces; $firstNumber + $secondNumber" | bc)
subtraction=$(echo "scale=$decimalPlaces; $firstNumber - $secondNumber" | bc)
multiplication=$(echo "scale=$decimalPlaces; $firstNumber * $secondNumber" | bc)
division=$(echo "scale=$decimalPlaces; $firstNumber / $secondNumber" | bc)

# Step 3: Display outputs
format="%.${decimalPlaces}f"
printf "$firstNumber + $secondNumber = $format\n" $addition
printf "$firstNumber - $secondNumber = $format\n" $subtraction
printf "$firstNumber * $secondNumber = $format\n" $multiplication
printf "$firstNumber / $secondNumber = $format\n" $division

