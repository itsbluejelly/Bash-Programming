# Bash Programming Tutorial

[![Lesson Branch Creation](https://github.com/itsbluejelly/Bash-Programming/actions/workflows/lesson_creation.yaml/badge.svg)](https://github.com/itsbluejelly/Bash-Programming/actions/workflows/lesson_creation.yaml)

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

2. __File/Folder names__: The file or folder names are used to detail what topic was covered in the lesson, for example, `lesson_1` has a script named `start.sh` which details the pilot of the tutorial series.

Each branch consists of

- __Readme__: A readme file that contains the details of the lesson and the scripts in the branch.
- __Scripts__: The scripts that were created during the lesson. Each script is named according to the topic covered in the lesson. It can either be a standalone file or a folder, but the name should suffice the purpose
- __info.txt__: A file that enables the bot running in the action to detect the metadata of the lesson identified by the branch name. It should consist of a topic name in a key-value format as shown below, but can also contain other optional metadata and should be in the root of the branch:

```text
topic: <topic name>
description: <description>
```

## Tutorial Series

The list below contains the topics covered in the tutorial series. Each topic is linked to its respective branch.

> They are automatically updated as the series progresses 😂

<!-- Please dont delete the comments surrounding the list of lessons🙏 -->
<!-- Start of tutorial list -->
<!-- End of tutorial list -->

## Guidelines

- This repository is free for public use. You can use the scripts and examples for learning purposes but they are by all means ___not___ meant to be used in production.
- If you have any suggestions or improvements, please feel free to open a pull request or issue.
- If you have a lesson suggestion, please ensure the pull request or branch has the structure described in the [Branch structure](#branch-structure).

## Credits

- This tutorial is heavily inspired by [Learn Linux TV](https://www.youtube.com/@LearnLinuxTV/videos) and the hard work they put in in the tutorial.Though the content is not directly copied from their videos, it is heavily inspired by the topics they cover. I highly recommend checking out their channel for more in-depth tutorials and explanations.
- I also want to give a shoutout to [DevHints](https://devhints.io/bash) for their amazing cheat sheet. It has been a great resource for me while learning Bash and I highly recommend it to anyone looking to learn the language.
