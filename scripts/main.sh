#!/bin/bash
# This package acts as the main script for the download script, handling the exit status conditionally.

# Step 1: Inquire about the package
read -p "What package would you like to install: " package
packagePath=$(command -v "$package")

# Step 2: Initialise the logs
successLogs="./logs/success.csv"
failureLogs="./logs/failure.csv"
installLogs="./logs/install.txt"

if [[ ! -d "./logs" ]]; then
    mkdir "./logs"
fi

if [[ ! -s "$successLogs" ]]; then
    echo -e "Date and time,Package,message" > "$successLogs"
fi

if [[ ! -s "$failureLogs" ]]; then
    echo -e "Date and time,Package,Error code,message" > "$failureLogs"
fi

# Step 3: Install the package
if ./scripts/download.sh -p "$package" -s "$successLogs" -f "$failureLogs" -i "$installLogs"; then
    echo "Feel free to view the package logs at $installLogs and success logs at $successLogs."
else
    echo "An error occurred while installing $package. Kindly check the logs at $failureLogs for more details."
    exit
fi