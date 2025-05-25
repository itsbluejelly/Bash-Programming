import { describe, expect } from "vitest"

import {
	addTutorial,
	editTutorial,
	getBranchInfo,
	getFilePath,
	getTutorialMarkerIndices,
	readTutorialList,
	TUTORIAL_MARKERS,
} from "~/.github/scripts/update-readme"

import path from "node:path"
import UpdateReadmeTest from "~/tests/fixtures/workflows/update-readme.fixture"
import type { BranchInfoType } from "~/schemas/branch-info/type"

describe("getFilePath function", () => {
	UpdateReadmeTest(
		"It should return the correct path relative to the root",

		() => {
			const fileName = "vitest.config.ts"
			const filePath = getFilePath(fileName)

			const correctPath = path.resolve(
				__dirname,
				"..",
				"..",
				"..",
				fileName
			)

			expect(filePath).toBe(correctPath)
		}
	)
})

describe("getTutorialMarkerIndices function", () => {
	UpdateReadmeTest(
		"It should throw an error on missing tutorial start marker",

		async ({ writeMarkdownFile, getMarkdownFile }) => {
			await writeMarkdownFile("")
			const fileData = await getMarkdownFile()

			expect(() =>
				getTutorialMarkerIndices(fileData.split("\n"))
			).toThrowError(/^Missing start marker/i)
		}
	)

	UpdateReadmeTest(
		"It should throw an error on missing tutorial end marker",

		async ({ writeMarkdownFile, getMarkdownFile }) => {
			await writeMarkdownFile(TUTORIAL_MARKERS.START)
			const fileData = await getMarkdownFile()

			expect(() =>
				getTutorialMarkerIndices(fileData.split("\n"))
			).toThrowError(/^Missing end marker/i)
		}
	)

	UpdateReadmeTest(
		"It should return the right indices",

		async ({ writeMarkdownFile, getMarkdownFile }) => {
			await writeMarkdownFile(
				`${TUTORIAL_MARKERS.START}\n${TUTORIAL_MARKERS.END}`
			)
			const fileData = await getMarkdownFile()
			const result = getTutorialMarkerIndices(fileData.split("\n"))

			expect(result).toEqual<typeof result>({
				tutorialStart: 0,
				tutorialEnd: 1,
			})
		}
	)
})

describe("readTutorialList function", () => {
	UpdateReadmeTest(
		"It should return 0 if none",

		async ({ writeMarkdownFile }) => {
			await writeMarkdownFile(
				`${TUTORIAL_MARKERS.START}\n\n\n${TUTORIAL_MARKERS.END}`
			)
			const tutorials = await readTutorialList()

			expect(tutorials.length).toBe(0)
		}
	)

	UpdateReadmeTest(
		"It should return the tutorials without the middle section and newlines",

		async ({ writeMarkdownFile }) => {
			const tutorial = `- [__Lesson 0__](https://github.com/itsbluejelly/Bash-Programming/tree/${process.env.BRANCH_NAME})\n  - Last updated: today_`

			await writeMarkdownFile(
				`${TUTORIAL_MARKERS.START}\n${tutorial}\n${TUTORIAL_MARKERS.MIDDLE}\n${tutorial}\n${TUTORIAL_MARKERS.MIDDLE}\n${TUTORIAL_MARKERS.END}`
			)

			const tutorials = await readTutorialList()

			expect(tutorials.length).toBe(2)
			expect(tutorial[0]).not.toContain(TUTORIAL_MARKERS.MIDDLE)
			expect(tutorial[1]).not.toContain(TUTORIAL_MARKERS.MIDDLE)
		}
	)
})

describe("addTutorial function", () => {
	UpdateReadmeTest(
		"It should append to the file",

		async ({ writeMarkdownFile, getMarkdownFile }) => {
			// Step 1: Write to the markdown and create a mock tutorial
			await writeMarkdownFile(
				`${TUTORIAL_MARKERS.START}\n${TUTORIAL_MARKERS.END}`
			)

			const tutorial = `- [__Lesson 0__](https://github.com/itsbluejelly/Bash-Programming/tree/${process.env.BRANCH_NAME})\n  - Last updated: today_`

			// Step 2: Add tutorial and compare content
			await addTutorial(tutorial, [])
			const fileData = await getMarkdownFile()

			expect(fileData).toBe(
				`${TUTORIAL_MARKERS.START}\n${tutorial}\n${TUTORIAL_MARKERS.MIDDLE}\n${TUTORIAL_MARKERS.END}`
			)
		}
	)

	UpdateReadmeTest(
		"It should append to the file irregardless of having a similar tutorial",

		async ({ writeMarkdownFile, getMarkdownFile }) => {
			// Step 1: Write to the markdown and create a mock tutorial
			await writeMarkdownFile(
				`${TUTORIAL_MARKERS.START}\n${TUTORIAL_MARKERS.END}`
			)

			const tutorial = `- [__Lesson 0__](https://github.com/itsbluejelly/Bash-Programming/tree/${process.env.BRANCH_NAME})\n  - Last updated: today_`

			// Step 2: Add tutorial and compare content
			await addTutorial(tutorial, [tutorial])
			const fileData = await getMarkdownFile()

			expect(fileData).toBe(
				`${TUTORIAL_MARKERS.START}\n${tutorial}\n${TUTORIAL_MARKERS.MIDDLE}\n${tutorial}\n${TUTORIAL_MARKERS.MIDDLE}\n${TUTORIAL_MARKERS.END}`
			)
		}
	)

	UpdateReadmeTest(
		"It should sort the tutorials accordingly",

		async ({ writeMarkdownFile, getMarkdownFile }) => {
			// Step 1: Write to the markdown and create a mock tutorial
			await writeMarkdownFile(
				`${TUTORIAL_MARKERS.START}\n${TUTORIAL_MARKERS.END}`
			)

			const firstTutorial = `- [__Lesson 0__](https://github.com/itsbluejelly/Bash-Programming/tree/${process.env.BRANCH_NAME})\n  - Last updated: today_`
			const secondTutorial = `- [__Lesson 10__](https://github.com/itsbluejelly/Bash-Programming/tree/${process.env.BRANCH_NAME})\n  - Last updated: today_`

			// Step 2: Add tutorial and compare content
			await addTutorial(secondTutorial, [firstTutorial], "desc")
			const fileData = await getMarkdownFile()

			expect(fileData).toBe(
				`${TUTORIAL_MARKERS.START}\n${secondTutorial}\n${TUTORIAL_MARKERS.MIDDLE}\n${firstTutorial}\n${TUTORIAL_MARKERS.MIDDLE}\n${TUTORIAL_MARKERS.END}`
			)
		}
	)
})

describe("editTutorial function", () => {
	UpdateReadmeTest(
		"It should throw an error when editing a non-existent tutorial",

		async ({ writeMarkdownFile }) => {
			// Step 1: Write to the markdown and create sample tutorial
			await writeMarkdownFile(
				`${TUTORIAL_MARKERS.START}\n${TUTORIAL_MARKERS.END}`
			)

			const tutorial = `- [__Lesson 0__](https://github.com/itsbluejelly/Bash-Programming/tree/${process.env.BRANCH_NAME})\n  - Last updated: today_`

			// Step 2: Attempt to edit the file
			expect(editTutorial(tutorial, [])).rejects.toThrowError(
				/doesn't exist/
			)
		}
	)

	UpdateReadmeTest(
		"It should edit appropriately",

		async ({ writeMarkdownFile, getMarkdownFile }) => {
			// Step 1: Write to the markdown and create sample tutorial
			await writeMarkdownFile(
				`${TUTORIAL_MARKERS.START}\n${TUTORIAL_MARKERS.END}`
			)

			const tutorial = `- [__Lesson 0__](https://github.com/itsbluejelly/Bash-Programming/tree/${process.env.BRANCH_NAME})\n  - Last updated: today_`
			const oldTutorial = `- [__Lesson 0__](https://github.com/itsbluejelly/Bash-Programming/tree/${process.env.BRANCH_NAME})\n  - Last updated: yesterday_`

			// Step 2: Edit the file and test
			await editTutorial(tutorial, [oldTutorial])
			const fileData = await getMarkdownFile()

			expect(fileData).toBe(
				`${TUTORIAL_MARKERS.START}\n${tutorial}\n${TUTORIAL_MARKERS.MIDDLE}\n${TUTORIAL_MARKERS.END}`
			)
		}
	)
})

describe("getBranchInfo function", () => {
	UpdateReadmeTest(
		"It should throw an error if the data isn't in the proper format",

		async () => {
			const fileData = JSON.stringify({ topic: "" } as BranchInfoType)

			expect(getBranchInfo(fileData)).rejects.toThrowError(/5 characters/)
		}
	)

	UpdateReadmeTest(
		"It should return the right data",

		async () => {
			const fileData: BranchInfoType = {
				topic: "Topics",
				description: "my description",
				author: "itsme",
				lastUpdated: new Date().toUTCString(),
			}

			const branchInfo = await getBranchInfo(JSON.stringify(fileData))

            expect(branchInfo).toEqual(fileData)
		}
	)

    UpdateReadmeTest(
		"It should set proper defaults",

		async () => {
			const fileData: BranchInfoType = {
				topic: "Topics",
			}

			const branchInfo = await getBranchInfo(JSON.stringify(fileData))

			expect(branchInfo).toEqual({
                ...fileData,
                author: process.env.ACTOR,
                lastUpdated: new Date(process.env.LAST_UPDATED_AT!).toUTCString()
            })
		}
	)
})
