#!/bin/bash
# This script is meant to log the sounds added as input to the logfile

# Step 1: Check if the params are in the proper format, ie -a "a,b,c" -s "a,b,c"
echo "Starting log script..."
parameters="$@"
animalsParam=""
soundsParam=""

if [[ ! "$parameters" =~ "-a "* ]]; then
    echo "Invalid params, missing the animal keys, which should be in the -a option comma delimited, eg '-a cow,cat'"
    exit 1
else
    tempString=${parameters#*-a }
    validString=${tempString%% *}

    if [[ ! "$validString" =~ ^[a-zA-Z]+(,[a-zA-Z]+)*$ ]]; then
        echo "Invalid animal param, should be comma delimited, eg 'cat,cow'"
        exit 5
    else
        animalsParam=$(echo "$validString" | sed -E 's/(\b\w)/\U&/g')
        echo "Normalised animals✅"
    fi
fi

if [[ ! "$parameters" =~ "-s "* ]]; then
    echo "Invalid params, missing the sound values, which should be in the -s option comma delimited, eg '-s moo,meow'"
    exit 1
else
    tempString=${parameters#*-s }
    validString=${tempString%% *}

    if [[ ! "$validString" =~ ^[a-zA-Z]+(,[a-zA-Z]+)*$ ]]; then
        echo "Invalid sound param, should be comma delimited, eg 'moo,meow'"
        exit 5
    else
        soundsParam=$(echo "$validString" | sed -E 's/(\b\w)/\U&/g')
        echo "Normalised sounds✅"
    fi
fi

# Step 2: Initialise the log folder
echo "Initialising log files"
logFolder="./logs"
logFile="sounds.csv"

if [[ ! -d "$logFolder" ]]; then
    mkdir -p "$logFolder"
    echo "Created log folder $logFolder"
fi

echo "Animal,Sound" > "$logFolder/$logFile"
echo "Created log files at $logFolder/$logFile"

# Step 3: Write to the logs
echo "Writing results to log file..."
animals=($(echo "$animalsParam" | tr ',' '\n'))
sounds=($(echo "$soundsParam" | tr ',' '\n'))

for ((index=0; index <= "${#animals[@]}"; index++)); do
    animal="${animals[$index]}"
    sound="${sounds[$index]}"

    if [[ -n "$animal" && -n "$sound" ]]; then
       echo "$animal,$sound" >> "$logFolder/$logFile"
       echo "Appended $animal with sound $sound at line $((index + 2))..."
    fi
done

echo "Completed log script✅"