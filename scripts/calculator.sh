#!/bin/bash
# The script is used as an introduction to the calculator program, while considering arguments

if [[ -z "$@" ]]; then
    ./scripts/calculator-prompt.sh
else
    ./scripts/calculator-args.sh "$@"
fi