#!/bin/bash
# This package acts as the main script for the download script, handling the exit status conditionally.

# Step 1: Inquire about the package
read -p "What package would you like to install: " package
packagePath=$(command -v "$package")

# Step 2: Initialise the logs
successLogs="../logs/success.log"
failureLogs="../logs/failure.log"
installLogs="../logs/install.log"

if [[ ! -d "../logs" ]]; then
    mkdir "../logs"
else
    if [[ ! -s "$successLogs" ]]; then
        echo "Date and time\tPackage\tmessage" > "$successLogs"
    elif [[ ! -s "$failureLogs" ]]; then
        echo "Date and time\tPackage\tError code\tmessage" > "$failureLogs"
    fi
fi

# Step 3: Install the package
if ./download.bash -p "$package" -s "$successLogs" -f "$failureLogs" -i "$installLogs"; then
    echo "Feel free to view the package logs at $installLogs and success logs at $successLogs."
else
    echo "An error occurred while installing $package. Kindly check the logs at $failureLogs for more details."
    exit
fi