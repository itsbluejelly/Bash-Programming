#!/bin/bash
# This script is meant to log the sounds added as input to the logfile

# Step 1: Check if the params are in the proper format
echo "Starting log script..."
parameters="$@"
animalsParam=""
soundsParam=""

if [[ ! "$parameters" =~ "-a "\w* ]]; then
    echo "Invalid params, missing the animal keys, which should be in the -a option comma delimited, eg '-a cow,cat'"
    exit 1
else
    tempString=${parameters#*-a }
    validString=${tempString%% *}

    if [[ ! "$validString" =~ (\w+,?)+ ]]; then
        echo "Invalid animal param, should be comma delimited, eg 'cat,cow'"
        exit 5
    else
        animalsParam=$(echo "$validString" | sed -E 's/(\b\w)/\U&/g')
        echo "Normalised animals✅"
    fi
fi

if [[ ! "$parameters" =~ "-s "\w* ]]; then
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
    echo "Created log folder✅"
fi

if [[ ! -s "$logFolder/$logFile" ]]; then
    echo "Animal,Sound" > "$logFolder/$logFile"
    echo "Created log files✅"
fi

# Step 3: Write to the logs
echo "Writing results to log file..."
declare -A animals
animalCount=$(echo "$animalsParam" | tr ',' '\n' | wc -l)

for ((index=1; index <= animalCount; index++)); do
    animal=$(echo "$animalsParam" | cut -d ',' -f "$index")
    sound=$(echo "$soundsParam" | cut -d ',' -f "$index")

    if [[ -n "$animal" && -n "$sound" ]]; then
       echo "$animal,$sound" >> "$logFolder/$logFile"
       echo "Appended $animal with sound $sound at line $index..."
    fi
done

echo "Completed log script✅"