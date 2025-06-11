# Lesson 6: While Loops

The lesson extensively covers the use of while loops in bash. The example script provided demonstrates how to use while loops to repeatedly ask for proper prompt from the user, if not provided as parameters. The script then uses the user input to count till the user's limit is reached in any order.

## How to use

1. Clone the repository:

   ```bash
   git clone https://github.com/itsbluejelly/Bash-Programming <your-directory>
   ```

2. Checkout to the lesson branch:

   ```bash
   git checkout lesson-6
   ```

3. Make the script executable:

   ```bash
   chmod +x loops.sh
   ```

4. Run the script:

    With both parameters:

    ```bash
    ./loops.sh -l <limit> -n <number>
    ```

    Or, run with any of the required parameters. Those missing will be prompted for:

    ```bash
    ./loops.sh -l <limit>
    ```

    Or, just run the script to be prompted for both:

    ```bash
    ./loops.sh
    ```
