# Lesson 7: For Loops

The lesson covers the use of for loops in bash, and how to utilise them with data structures like arrays and strings. There are 2 examples provided in the `scripts` dictionary to illustrate this, with the main focus of the program being to record animal noises from user input.

- [logfile.sh](./scripts/logfile.sh): This script demonstrates how to make use of conditional statements to ensure the parameters are in the right format via POSIX compliant regex. It then uses the list of animals and sounds to create a log file and append the records, rewriting the file if the command is re-ran. This is made possible by using lists, string substitution and for loops to iterate through the data. It also ensures data integrity by only recording pairs
- [input.sh](./scripts/input.sh): This script acts as a wrapper for the [logfile.sh](./scripts/logfile.sh) script, allowing the user to input their own animal and sound either via command line arguments or interactive input. It also ensures that the number of required records is dynamic if either sound or animal parameters aren't provided, and it will prompt the user for input until the required number of records is met.

## Table Of Contents

- [Lessons learnt](#lessons-learnt)
- [How to run the scripts](#how-to-run-the-scripts)

## Lessons learnt

- Usage of for loops in bash. Including use of these iteration structures:
  - Ranges
  - Arrays
  - Associative arrays
- How to use regex to validate input appropriately
- Use of arrays, including how to declare and operate on them
- Use of dictionaries or associative arrays, and understanding their limitations
- Special parameter variables, such as:
  - __`$@`__: To pass all parameters as space-separated strings
  - __`$#`__: To get the number of parameters passed
  - __`$*`__: To pass all parameters as a single string, etc

## How to run the scripts

1. Clone the repository:

   ```bash
   git clone https://github.com/itsbluejelly/Bash-Programming <your-directory>
   ```

2. Checkout to the lesson branch:

   ```bash
   git checkout lesson-7
   ```

3. Make the scripts executable:

   ```bash
    chmod +x scripts/*.sh
    ```

4. Run the `input.sh` script, either in the following ways:

    - Without parameters, to enable full interactive mode:

        ```bash
        ./scripts/input.sh
        ```

    - With optional parameters, to enable prompting where necessary and error handling:

        ```bash
        ./scripts/input.sh -a <animals,comma-separated> -s <sounds, comma-separated> -c <number-of-records>
        ```

    - With all parameters, to skip prompting:

        ```bash
        ./scripts/input.sh -a <animals,comma-separated> -s <sounds, comma-separated> -c <number-of-records>
        ```

5. View the log file created in the `logs` directory:

    ```bash
    cat logs/sounds.csv
    ```

6. Feel free to run the `logfile.sh` script. Though it is required to pass all parameters

    ```bash
    ./scripts/logfile.sh -a <animals,comma-separated> -s <sounds, comma-separated>
    ```
