import Ajv, { type JSONSchemaType } from "ajv"
import fsPromises from "node:fs/promises"
import path from "node:path"
import type { BranchInfoType } from "~/schemas/branch-info/type"

/** An object that contains the section markers for the tutorials in the readme file */
const TUTORIAL_MARKERS = {
	/** The marker that identifies the start of this section */
	START: "<!-- Start of tutorial list -->" as const,
	/** The marker that identifies the end of this section */
	END: "<!-- End of tutorial list -->" as const,
	/** The marker that separates each lesson */
	MIDDLE: "<!-- Lesson here -->" as const,
}

/** An object that contains important file names */
const FILE_NAMES = {
	/** The name to the branch info metadata file */
	BRANCH_INFO: "branch-info.json" as const,
	/** The name to the readme file */
	README: "README.md" as const,
	/** The name of the schema file */
	SCHEMA_FILE: ".schema.json" as const,
}

/**
 * A function to get the platform-independent path to a specific file, from the root
 * @returns The path to the file
 */
export const getFilePath = (fileName: string) =>
	path.join(__dirname, "..", "..", fileName)

/**
 * A function that gets the indices of the tutorial markers in a specified file, and throws an error if either is not present
 * @param fileData The file's data to parse through, in an array format
 * @returns An object with the indices on the tutorial markers
 */
function getTutorialMarkerIndices(fileData: string[]) {
	const tutorialStart = fileData.indexOf(TUTORIAL_MARKERS.START)
	const tutorialEnd = fileData.indexOf(TUTORIAL_MARKERS.END)

	if (tutorialStart === -1) {
		throw new Error(`Missing start marker ${TUTORIAL_MARKERS.START}`)
	} else if (tutorialEnd === -1) {
		throw new Error(`Missing end marker ${TUTORIAL_MARKERS.END}`)
	}

	return {
		/** The index of where the start tutorial marker is in the array of data */
		tutorialStart,
		/** The index of where the end tutorial marker is in the array of data */
		tutorialEnd,
	}
}

/**
 * A function that reads the section with the tutorials from the markdown file, and returns them as a list
 * @returns The list of the current tutorials currently in the readME file
 */
async function readTutorialList() {
	// Step 1: Get the markdown file and the marker indices
	const markdownFilePath = getFilePath(FILE_NAMES.README)

	const markdownFile = await fsPromises.readFile(markdownFilePath, {
		encoding: "utf-8",
	})

	const markdownFileData = markdownFile.split("\n")

	const { tutorialEnd, tutorialStart } =
		getTutorialMarkerIndices(markdownFileData)

	// Step 2: Get the list of tutorials(take note of the start marker and separate via the middle marker)
	const startIndex = tutorialStart + 1

	const tutorials = markdownFileData
		.slice(startIndex, tutorialEnd) // Get only the listed tutorial section with their markers
		.join("\n") // Join via newlines
		.split(`${TUTORIAL_MARKERS.MIDDLE}\n`) // Split via the line with the middle marker, to get the sections
		.filter((arg) => arg.length > 0) // Remove empty strings
		.map((arg) => arg.split(`\n${TUTORIAL_MARKERS.MIDDLE}`)[0]?.trim()!) // Remove the ending middle marker + newlines

	return tutorials
}

/**
 * A function that appends a given tutorial to the current tutorials, and writes it to the tutorial section in the order specified
 * @param tutorial The string of the tutorial to add
 * @param currentTutorials The list of the previous tutorials to append to
 * @param order The order to write the new tutorials after appending, can be `asc` or `desc` and defaults to `asc`
 */
async function addTutorial(
	tutorial: string,
	currentTutorials: string[],
	order: "asc" | "desc" = "asc"
) {
	// Step 1: Add to the current tutorials and sort in the specified order
	currentTutorials.push(tutorial)

	currentTutorials = currentTutorials.map(
		(tutorial) => `${tutorial}\n${TUTORIAL_MARKERS.MIDDLE}`.trim() // Add ending marker to all tutorials
	)

	currentTutorials.sort((firstTutorial, secondTutorial) => {
		// Get the matches
		const regex = /Lesson (\d+)/
		const firstMatch = firstTutorial.match(regex)
		const secondMatch = secondTutorial.match(regex)

		// Get the lesson numbers
		const firstTutorialLesson = firstMatch?.[1]
		const secondTutorialLesson = secondMatch?.[1]

		// Convert the lessons to numbers
		const firstTutorialLessonNo = parseInt(firstTutorialLesson ?? "")
		const secondTutorialLessonNo = parseInt(secondTutorialLesson ?? "")

		// Sort based on order
		return order === "asc"
			? firstTutorialLessonNo - secondTutorialLessonNo
			: secondTutorialLessonNo - firstTutorialLessonNo
	})

	// Step 2: Get the file path and the tutorial indices
	const markdownFilePath = getFilePath(FILE_NAMES.README)

	const markdownFile = await fsPromises.readFile(markdownFilePath, {
		encoding: "utf-8",
	})

	const markdownFileData = markdownFile.split("\n")

	const { tutorialStart, tutorialEnd } =
		getTutorialMarkerIndices(markdownFileData)

	// Step 3: Write to the markdown section(Take note of the index start)
	const startIndex = tutorialStart + 1

	markdownFileData.splice(
		startIndex,
		tutorialEnd - startIndex,
		...currentTutorials
	)

	await fsPromises.writeFile(markdownFilePath, markdownFileData.join("\n"), {
		encoding: "utf-8",
	})
}

/**
 * A function that edits an existing tutorial in place, and writes the changes to the markdown file
 * @param tutorial The tutorial to edit
 * @param currentTutorials THe current tutorials present in the markdown
 */
async function editTutorial(tutorial: string, currentTutorials: string[]) {
	// Step 1: Find the tutorial in the current ones and add ending marker to all tutorials
	const correctTutorial = `${tutorial}\n${TUTORIAL_MARKERS.MIDDLE}`.trim()

	currentTutorials = currentTutorials.map((tutorial) =>
		`${tutorial}\n${TUTORIAL_MARKERS.MIDDLE}`.trim()
	)

	const editIndex = currentTutorials.findIndex((currentTutorial) => {
		// Get the title
		const regex = /Lesson \d+/
		const editedTitle = correctTutorial.match(regex)?.[0]
		const currentTitle = currentTutorial.match(regex)?.[0]

		return currentTitle && currentTitle === editedTitle
	})

	if (editIndex === -1) {
		throw new Error("This tutorial doesn't exist yet")
	}

	// Step 2: Replace it in the list
	currentTutorials.splice(editIndex, 1, correctTutorial)

	// Step 3: Get the markdown file and tutorial indices
	const filePath = getFilePath(FILE_NAMES.README)

	const markdownFile = await fsPromises.readFile(filePath, {
		encoding: "utf-8",
	})

	const markdownFileData = markdownFile.split("\n")

	const { tutorialEnd, tutorialStart } =
		getTutorialMarkerIndices(markdownFileData)

	// Step 4: Write the new list to the markdown
	const startIndex = tutorialStart + 1

	markdownFileData.splice(
		startIndex,
		tutorialEnd - startIndex,
		...currentTutorials
	)

	await fsPromises.writeFile(filePath, markdownFileData.join("\n"), {
		encoding: "utf-8",
	})
}

/**
 * A function that parses the branch-info.json file and returns valid data in key-value format, and throws an error if the content isn't in the required format
 * @param fileData The data present in the file, in JSON format
 * @returns An object with the valid data
 */
async function getBranchInfo(fileData: string) {
	// Step 1: Prepare the parser
	const ajv = new Ajv()

	const filePath = getFilePath(
		path.join("schemas", "branch-info", FILE_NAMES.SCHEMA_FILE)
	)

	const schema = JSON.parse(
		await fsPromises.readFile(filePath, { encoding: "utf-8" })
	) as JSONSchemaType<BranchInfoType>

	const parse = ajv.compile(schema)

	// Step 2: Parse the file data
	const parsedData = JSON.parse(fileData)
	if (!parse(parsedData)) throw new Error(parse.errors?.join("\n,"))

	// Step 3: Prepare defaults if data is okay
	const givenDate = parsedData.lastUpdated ?? process.env.LAST_UPDATED_AT
	const updateDate = givenDate ? new Date(givenDate) : new Date()

	const branchInfoData: BranchInfoType = {
		author: process.env.ACTOR,
		...parsedData,
		lastUpdated: updateDate.toUTCString()
	}

	return branchInfoData
}

async function main() {
	// Step 1: Read the branch-info file
	const infoFilePath = getFilePath(FILE_NAMES.BRANCH_INFO)

	const infoFileData = await fsPromises.readFile(infoFilePath, {
		encoding: "utf-8",
	})

	// Step 2: Get the valid branch info data and branch name
	const infoData = await getBranchInfo(infoFileData)
	const branchName = process.env.BRANCH_NAME

	if (!branchName) {
		throw new Error("The branch name is not present in the env variables")
	}

	const regex = /^lesson_\d+$/

	if (!regex.test(branchName)) {
		throw new Error("The branch name is not in the required format")
	}

	const properBranchName = branchName[0]
		?.toUpperCase()
		.concat(branchName.toLowerCase().replace("_", " ").slice(1))

	// Step 3: Form the markdown entry title
	const title = `${properBranchName}: ${infoData.topic}`

	const entry = `- [__${title}__](https://github.com/itsbluejelly/Bash-Programming/tree/${branchName})${
		infoData.description ? `\n${infoData.description}` : ""
	}${
		infoData.author
			? `\n  - Covered by: [${infoData.author}](https://github.com/${infoData.author})`
			: ""
	}\n  - Last updated: _${infoData.lastUpdated}_`

	// Step 4: Edit or add the entry to the markdown
	const oldTutorials = await readTutorialList()

	if (
		oldTutorials.some((tutorial) =>
			tutorial.includes(properBranchName ?? title)
		)
	) {
		console.log({ entry, oldTutorials })
		await editTutorial(entry, oldTutorials)
	} else {
		console.log({ entry, oldTutorials })
		await addTutorial(entry, oldTutorials)
	}

	console.log(await readTutorialList())
}

if (require.main === module) {
	main()
}
