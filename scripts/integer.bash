# !/bin/bash

# This script takes 2 user-provided arguments, and performs math operations on them
# Step 1: Prompt for numbers
echo -n "Enter first integer: "
read firstNumber

echo -n "Enter second integer: "
read secondNumber

# Step 2: Perform operations
addition=$(($firstNumber + $secondNumber))
subtraction=$(($firstNumber - $secondNumber))
multiplication=$(($firstNumber * $secondNumber))
division=$(($firstNumber / $secondNumber))
remainder=$(($firstNumber % $secondNumber))

# Step 3: Display outputs
echo "$firstNumber + $secondNumber = $addition"
echo "$firstNumber - $secondNumber = $subtraction"
echo "$firstNumber * $secondNumber = $multiplication"
echo "$firstNumber / $secondNumber = $division rem $remainder"

