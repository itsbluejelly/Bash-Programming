# Lesson 8: Functions and Case Statements

This lesson covers the use of case statements in bash. It also combines this with functions together with parameter handling so as to combine them and create powerful scripts. There are 3 examples provided to demonstrate this in the `scripts` directory, with the main task being to create a calculator script that can handle basic arithmetic operations.

1. [calculator.sh](scripts/calculator.sh): This is the main entrypoint for the script. It conditionally loads the [calculator-prompt.sh](scripts/calculator-prompt.sh) script to handle user input or calls the [calculator-args.sh](scripts/calculator-functions.sh) script to perform the calculations based on the parameters passed to the script.
2. [calculator-prompt.sh](scripts/calculator-prompt.sh): This script handles user input by providing a menu and prmpting the user for action. It then calls the appropriate functions based on the choice selected, while supporting all types of digits. It also handles edge cases and invalid input while letting the user know of any encountered errors
3. [calculator-args.sh](scripts/calculator-args.sh): This script handles the command line arguments passed to the script. It checks for the correct number and type of arguments and calls the appropriate functions based on the operation requested. It also handles edge cases like 0 division and invalid params, while letting the user know of any problems.

## Table of Contents

- [Lesson 8: Functions and Case Statements](#lesson-8-functions-and-case-statements)
  - [Lessons Learnt](#lessons-learnt)
  - [How to run the scripts](#how-to-run-the-scripts)

## Lessons Learnt

- Case statements in bash, including
  - Syntax and structure
  - Different types of terminators in cases, like the fallback `;&`
  - Case matching via POSIX regex
- Functions, including
  - Exit codes and return values
  - Parameter handling
  - Function scope and variable visibility, eg `local` variables

## How to run the scripts

1. Clone the repository:

   ```bash
   git clone https://github.com/itsbluejelly/Bash-Programming <your-directory>
   ```

2. Checkout to the lesson branch:

   ```bash
   cd <your-directory>
   git checkout lesson_8
   ```

3. Make the scripts executable:

   ```bash
   chmod +x scripts/*.sh
   ```

4. Run the calculator script, either as:

   - Without parameters, which will prompt for user input:

     ```bash
     ./scripts/calculator.sh
     ```

   - With parameters, which will perform the calculations based on the parameters passed:

     ```bash
     ./scripts/calculator.sh <operation> <number(s)>
     ```

    > It is important to note that all parameters, except for the operation `--scale` will be executed in the order passed in.
    >
    > Also, the script handles both integers and floats for all operations except for `--scale`, and the numbers provided must be separated by commas if more than one. For example, to add two numbers, you would run:
    >
    >```bash
    >./scripts/calculator.sh -a 1,2
    >```
    >
    > Finally, the supported operations are:
    > - `-a`: Adds the numbers provided
    > - `-s`: Subtracts the numbers provided
    > - `-m`: Multiplies the numbers provided
    > - `-d`: Divides the numbers provided
    > - `--scale`: Determines the result of a division's decimal places

5. Feel free to explore and run the other scripts in the `scripts` directory, but the main script handles all this for you
