# Bash Programming Tutorial

[![Test Lesson update workflow](https://github.com/itsbluejelly/Bash-Programming/actions/workflows/test_lesson_update.yaml/badge.svg)](https://github.com/itsbluejelly/Bash-Programming/actions/workflows/test_lesson_update.yaml)
[![Lesson Branch Update](https://github.com/itsbluejelly/Bash-Programming/actions/workflows/lesson_update.yaml/badge.svg)](https://github.com/itsbluejelly/Bash-Programming/actions/workflows/lesson_update.yaml)

This repository is an archive of my journey learning Bash programming. It contains various scripts and examples that I have created while learning the language.

## Table of Contents

- [Bash Programming Tutorial](#bash-programming-tutorial)
  - [Branch Structure](#branch-structure)
  - [Tutorial Series](#tutorial-series)
  - [Guidelines](#guidelines)
  - [Credit](#credits)

## Branch Structure

To navigate the repo, please remember the following

1. __Branches__: The branches aside from the `main` branch are used to store different parts of the tutorial. Each branch contains a specific stage in the process. For example, the `lesson_1` branch contains all scripts listed in the 1st lesson, etc. The branch names are in the format `lesson_<number>`, where `<number>` is the lesson number, in lower snake case.

2. __File/Folder names__: The file or sub-folder names are used to detail what topic was covered in the lesson, for example, `lesson_1` has a script named `start.sh` which details the pilot of the tutorial series.You can choose to list all script files and folders in the root of the branch or create a folder named `scripts` at the root to store all the script files and folders. The latter is recommended for better organization.

Each branch consists of

- The scripts in a file or folder named after the topic covered in the lesson. For example, the `lesson_1` branch has a script named `start.sh` which details the pilot of the tutorial series.
- __.github__: The folder that contains the Github Actions and the associated scripts described in the main branch.This should be the same as the main branch and must be present.
- __.vscode__: The folder that contains the settings for the Visual Studio Code editor. It also enables intellisense for the `branch-info.json` file. It is not mandatory to have this folder in your branch, but it is recommended to have it with properties from the main branch for better development experience.
- __schemas__: The folder that contains the JSON schema for the `branch-info.json` file. It is not mandatory to have this folder in your branch, but it is recommended to have it for better development experience.
- __branch-info.json__: A file that enables the bot running in the action to detect the metadata of the lesson identified by the branch name. It should be in the root of the branch and is intellisense-enabled on vscode. It consists of the following fields:

```js
{
  "topic": "<topic name>", // The mandatory topic of the lesson
  "description": "<description>", // The optional description of the lesson
  "lastUpdated": "<date in YYYY-MM-DD format>", // The optional date when the lesson was last updated. By default its when the file was last edited in the remote branch. It should be in RFC 7231 format,
  "author": "<author name>", // The optional author of the lesson's github username. By default its the name of the user who triggered the lesson workflow
}
```

- __README.md__: A file that contains the description of the lesson. It is not mandatory to have this file in your branch, but it is recommended to have it for better understanding of the lesson. It should be in the root of the branch, and is by no means associated with the `branch-info.json` file.
- __.gitignore__: A file that contains the list of files and folders to be ignored by git. It is not mandatory to have this file in your branch, but it is recommended to have it for better organization of the branch.
- __.gitattributes__: A file that contains the list of attributes for the branch. It is not mandatory to have this file in your branch, but it is recommended to have it for better language detection on github.

> To ensure the branch has all the required files, please branch off the `demo_lesson` branch and name the new branch in the format specified above. The `demo_lesson` has all the required files and folders, with a dummy `branch-info.json` file, and is meant to be used as a template and not an example of a lesson.

## Tutorial Series

The list below contains the topics covered in the tutorial series. Each topic is linked to its respective branch.
> So far all the lessons are covered, until contributions are met😅
<!-- Please dont delete the comments surrounding and within list of lessons🙏 -->
<!-- Start of tutorial list -->
- [__Lesson 1: Intro to bash__](https://github.com/itsbluejelly/Bash-Programming/tree/lesson_1)
The lesson is meant to be a welcoming intro to some basic bash commands. It also brings about the use of subshells
  - Covered by: [itsbluejelly](https://github.com/itsbluejelly)
  - Last updated: _Tue, 03 Jun 2025 20:56:50 GMT_
<!-- Lesson here -->
- [__Lesson 2: Variables__](https://github.com/itsbluejelly/Bash-Programming/tree/lesson_2)
The lesson covers the use of variables to store data and reuse it later on. It also goes through the process of reading user input.
  - Covered by: [itsbluejelly](https://github.com/itsbluejelly)
  - Last updated: _Tue, 03 Jun 2025 21:39:43 GMT_
<!-- Lesson here -->
- [__Lesson 3: Math Operations__](https://github.com/itsbluejelly/Bash-Programming/tree/lesson_3)
The lesson covers the basics of math functions in bash
  - Covered by: [itsbluejelly](https://github.com/itsbluejelly)
  - Last updated: _Tue, 03 Jun 2025 23:23:48 GMT_
<!-- Lesson here -->
- [__Lesson 4: If Statements__](https://github.com/itsbluejelly/Bash-Programming/tree/lesson_4)
The lesson covers the fundamentals of conditional logic and handling, using if-statements for branching operations
  - Covered by: [itsbluejelly](https://github.com/itsbluejelly)
  - Last updated: _Wed, 11 Jun 2025 07:38:19 GMT_
<!-- Lesson here -->
- [__Lesson 5: Exit codes__](https://github.com/itsbluejelly/Bash-Programming/tree/lesson_5)
The lesson covers the use and importance of exit codes. It also goes through file redirection techniques and proper stdin, stdout and stderr handling, combined with the use of special variables in shell scripts
  - Covered by: [itsbluejelly](https://github.com/itsbluejelly)
  - Last updated: _Wed, 11 Jun 2025 12:28:28 GMT_
<!-- Lesson here -->
- [__Lesson 6: While loops__](https://github.com/itsbluejelly/Bash-Programming/tree/lesson_6)
The lesson goes into depth on how while loops work in bash, and how to integrate them with branching conditions, for better input validation and user experience
  - Covered by: [itsbluejelly](https://github.com/itsbluejelly)
  - Last updated: _Wed, 11 Jun 2025 15:36:15 GMT_
<!-- Lesson here -->
- [__Lesson 7: For loops__](https://github.com/itsbluejelly/Bash-Programming/tree/lesson_7)
The lesson is meant to provide the understanding of for loops, as well as arrays and dictionaries. It also helps show how these topics co-exist together with editing commands to make complex scripts
  - Covered by: [itsbluejelly](https://github.com/itsbluejelly)
  - Last updated: _Fri, 13 Jun 2025 02:05:40 GMT_
<!-- Lesson here -->
- [__Lesson 8: Functions and case statements__](https://github.com/itsbluejelly/Bash-Programming/tree/lesson_8)
This is a combined lesson that explores the importance of using case statements and their benefits. It also dives into the concept of functions in bash and their usage and return values. It also delves into parameter handling (Making this the biggest lesson yet💀)
  - Covered by: [itsbluejelly](https://github.com/itsbluejelly)
  - Last updated: _Sat, 21 Jun 2025 23:48:10 GMT_
<!-- Lesson here -->
<!-- End of tutorial list -->

## Guidelines

- This repository is free for public use. You can use the scripts and examples for learning purposes but they are by all means ___not___ meant to be used in production.
- If you have any suggestions or improvements, please feel free to open a pull request or issue.
- If you have a lesson suggestion, please ensure the pull request or branch has the structure described in the [Branch structure](#branch-structure).

## Credits

- This tutorial is heavily inspired by [Learn Linux TV](https://www.youtube.com/@LearnLinuxTV/videos) and the hard work they put in in the tutorial.Though the content is not directly copied from their videos, it is heavily inspired by the topics they cover. I highly recommend checking out their channel for more in-depth tutorials and explanations.
- I also want to give a shoutout to [DevHints](https://devhints.io/bash) for their amazing cheat sheet. It has been a great resource for me while learning Bash and I highly recommend it to anyone looking to learn the language.
