#!/bin/bash
# This script installs a package using apt and logs output to success, failure and install logs.

# Step 1: Check the params
parameters="$@" # Should be in the format: -p package -s successLogs -f failureLogs -i installLogs
package="${${parameters#*-p }%% *}" # Extract package, from "* -p package *"
successLogs="${${parameters#*-s }%% *}" # Extract success logs, from "* -s successLogs *"
failureLogs="${${parameters#*-f }%% *}" # Extract failure logs, from "* -f failureLogs *"
installLogs="${${parameters#*-i }%% *}" # Extract install logs, from "* -i installLogs *"

if [[ -z "$package" ]]; then
    echo "Package name is required. Please provide a package name using the -p option."
    exit 1
elif [[ -z "$successLogs" ]]; then
    echo "Path to the success logs is required. Please provide it using the -s option."
    exit 1
elif [[ -z "$failureLogs" ]]; then
    echo "Path to the failure logs is required. Please provide it using the -f option."
    exit 1
elif [[ -z "$installLogs" ]]; then
    echo "Path to the install logs is required. Please provide it using the -i option."
    exit 1
fi

# Step 2: Install the package
packagePath="$(command -v $package)"
dateFormat="%d of %b %Y at %I:%M:%S %P"

if [[ -n "$packagePath" ]]; then
    echo "$package is already installed at $packagePath. Try running '$package -h' or '$package --help' for more info on it."
    echo "$(date +$dateFormat)\t$package\t5\tPackage exists" >> "$failureLogs"
    exit 5
else
    echo "Installing $package..."
    failureMessage="$(sudo apt update && sudo apt install -y $package > $installLogs)"

    if [[ "$?" -eq 0 ]]; then
        echo "$package installed successfully at $packagePath"
        echo "$(date +$dateFormat)\t$package\tSuccessful install" >> "$successLogs"
    else
        echo "$(date +$dateFormat)\t$package\t10\t$failureMessage" >> "$failureLogs"
        exit 10
    fi
fi