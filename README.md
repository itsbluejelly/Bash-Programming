# Lesson 5: Exit codes

The lesson covers the use of exit codes in shell scripts, which are crucial for error handling and control flow in scripts.It has the following examples in the `scripts` directory to utilise this:

1. [download.sh](scripts/download.sh): A script that uses positional parameters to download specified packages, while logging out the results during the installations in the `logs` directory. It also handles errors by creating proper exit codes and printing out error messages to the console.
2. [main.sh](scripts/main.sh): A script that calls [download.sh](scripts/download.sh) with the required parameters, demonstrating how to handle exit codes and errors in a script. It also prints error or success messages based on the exit codes, while properly prompting the user where necessary.

## Topics Covered

- Exit codes in shell scripts
- Error handling and file redirection
- Positional params and special variables

## How to Run

1.Clone the repository:

```bash
git clone https://github.com/itsbluejelly/Bash-Programming <your-directory>
```

2.Switch to the lesson branch:

```bash
git checkout lesson_5
```

3.Make the main scripts executable:

```bash
chmod +x ./scripts/*
```

4.Run the main script:

  ```bash
  ./scripts/main.sh
  ```

5.Or run the download script directly with params:

```bash
  ./scripts/download.sh -p <package-name> -s <success-log-path> -e <error-log-path> -i <install-log-path>
 ```
