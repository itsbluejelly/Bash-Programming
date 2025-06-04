# Lesson 4: If Statements

This lesson covers the use of if-statements and conditional logic in bash. It includes 3 examples under the `scripts` directory to illustrate this.

- [`basic.bash`](scripts/basic.bash): A file that demonstrates the use of nested if-statements with conditional logic in both numbers and strings. It takes in the value, its compared value and their type as user input.
- [`file.bash`](scripts/file.bash): A file that demonstrates the use of if-statements to check for the existence of a file path and its type. It takes in the file path as user input and displays whether it exists and if its a file or directory.
- [`advanced.bash`](scripts/advanced.bash): A file that demonstrates the use of if-statements for a more complex use case. It takes in the command the user wants to run and checks if the executable exists in the system. If so it runs the command, otherwise it tries to install it using `apt` and displays an error message if it fails, otherwise it runs the command.

## Table of Contents

- [Lesson 4: If Statements](#lesson-4-if-statements)
  - [Topics Covered](#topics-covered)
  - [How to run](#how-to-run)

## Topics Covered

- Logical operations in bash, which includes
  - Number comparisons
  - String comparisons
  - File comparisons
- Branching, via if-statements, which includes
  - If
  - If-else
  - If-elif-else
- Nesting conditional operations

## How to run

1.Clone the repository:

  ```bash
  git clone https://github.com/itsbluejelly/Bash-Programming <your-directory>
  ```

2.Switch to the lesson branch:

  ```bash
  git checkout lesson_3
  ```

3.Make the scripts executable:

  ```bash
  chmod +x ./scripts/*
  ```

4.Run the scripts altogether:

  ```bash
  ./scripts/*
  ```

5.Or run each script individually:

  ```bash
  ls -la ./scripts
  ./scripts/<file-name-of-script>
  ```
