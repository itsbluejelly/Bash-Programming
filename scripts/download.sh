#!/bin/bash
# This script installs a package using apt and logs output to success, failure and install logs.

# Step 1: Check the params
parameters="$@" # Should be in the format: -p package -s successLogs -f failureLogs -i installLogs

if [[ ! "$parameters" =~ "-p "\w* ]]; then
    echo "Package name is required. Please provide a package name using the -p option."
    exit 1
fi

if [[ ! "$parameters" =~ "-s "\w* ]]; then
    echo "Path to the success logs is required. Please provide it using the -s option."
    exit 1
fi

if [[ ! "$parameters" =~ "-f "\w* ]]; then
    echo "Path to the failure logs is required. Please provide it using the -f option."
    exit 1
fi

if [[ ! "$parameters" =~ "-i "\w* ]]; then
    echo "Path to the install logs is required. Please provide it using the -i option."
    exit 1
fi

# Extract package, from "* -p package *"
packageString="${parameters#*-p }"
package="${packageString%% *}"

# Extract success logs, from "* -s successLogs *"
successString="${parameters#*-s }"
successLogs="${successString%% *}"

# Extract failure logs, from "* -f failureLogs *"
failureString="${parameters#*-f }"
failureLogs="${failureString%% *}"

# Extract install logs, from "* -i installLogs *"
installString="${parameters#*-i }"
installLogs="${installString%% *}"

# Step 2: Install the package
packagePath="$(command -v $package)"
dateFormat="%d of %b %Y at %I:%M:%S %P"

if [[ -n "$packagePath" ]]; then
    echo "$package is already installed at $packagePath. Try running '$package -h' or '$package --help' for more info on it."
    echo -e "$(date +"$dateFormat"),$package,5,Package exists" >> "$failureLogs"
    exit 5
else
    echo "Installing $package..."
    sudo apt update && sudo apt install -y "$package" > "$installLogs" 2> "$failureLogs"

    if [[ "$?" -eq 0 ]]; then
        echo "$package installed successfully at $(command -v $package)"
        echo -e "$(date +"$dateFormat"),$package,Successful install" >> "$successLogs"
    else
        # Get the 1st error message
        failureMessage="$(cat $failureLogs | awk -F 'E:' '/^E:/ {print $2}' | head -n 1)"
        rm $failureLogs
        echo -e "$(date +"$dateFormat"),$package,10,$failureMessage" >> "$failureLogs"
        exit 10
    fi
fi