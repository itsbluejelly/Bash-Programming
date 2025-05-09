import fsPromises from "node:fs/promises"
import path from "node:path"

/** An object that contains the section markers for the tutorials in the readme file */
const TUTORIAL_MARKERS = {
	/** The marker that identifies the start of this section */
	START: "<!-- Start of tutorial list -->" as const,
	/** The marker that identifies the end of this section */
	END: "<!-- End of tutorial list -->" as const,
}

/** A list of all valid titles that should be parsed from `info.txt` file */
const VALID_TITLES = ["topic"] as const

/**
 * A function to get the platform-independent path to a specific file
 * @returns The path to the file
 */
const getFilePath = (fileName: string) =>
	path.join(__dirname, "..", "..", fileName)

/**
 * A function that gets the data of the tutorial markers in a specified file
 * @param fileData The file's data to parse through, in an array format
 * @returns An object with the metadata on the tutorial markers
 */
function getTutorialMarkerData(fileData: string[]) {
	const tutorialStart = fileData.indexOf(TUTORIAL_MARKERS.START)
	const tutorialEnd = fileData.indexOf(TUTORIAL_MARKERS.END)

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
	const markdownFilePath = getFilePath("README.md")
	const markdownFile = await fsPromises.readFile(markdownFilePath, {
		encoding: "utf-8",
	})
	const markdownFileData = markdownFile.split("\n")
	const { tutorialEnd, tutorialStart } =
		getTutorialMarkerData(markdownFileData)

	// Step 2: Get the list of tutorials(take note of the marker)
	const startIndex = tutorialStart + 1
	const tutorials = markdownFileData.slice(startIndex, tutorialEnd)

	return tutorials
}

/**
 * A function that appends a given tutorial to the current tutorials, and writes it to the tutorial section
 * @param tutorial The string of the tutorial to add
 * @param currentTutorials The list of the previous tutorials to append to
 */
async function appendTutorial(tutorial: string, currentTutorials: string[]) {
	// Step 1: Add to the current tutorials
	currentTutorials.push(tutorial)

	// Step 2: Get the file path and the tutorial indices
	const markdownFilePath = getFilePath("README.md")
	const markdownFile = await fsPromises.readFile(markdownFilePath, {
		encoding: "utf-8",
	})
	const markdownFileData = markdownFile.split("\n")
	const { tutorialStart, tutorialEnd } =
		getTutorialMarkerData(markdownFileData)

	// Step 3: Write to the markdown section(Take note of the index start)
	const fileContents = markdownFile.split("\n")
	const startIndex = tutorialStart + 1
	fileContents.splice(
		startIndex,
		tutorialEnd - startIndex,
		...currentTutorials
	)
	await fsPromises.writeFile(markdownFilePath, fileContents.join("\n"), {
		encoding: "utf-8",
	})
}

/**
 * A function that parses the info.txt file and returns valid data in key-value format, and throws an error if the content isn't in the required format
 * @param fileData A list of the content obtained in the file
 * @returns An object with the valid data
 */
function getInfoFileData(fileData: string[]) {
	// Step 1: Declare the info data object
	const infoData: Partial<Record<(typeof VALID_TITLES)[number], string>> = {}

	// Step 2: Get the data with the proper titles
	const validFileData = fileData.filter((entry) => {
		const [key] = entry.replace(/\s/g, "").split(":")
		return VALID_TITLES.includes(key as keyof typeof infoData)
	})

	if (!validFileData.length)
		throw new Error("The file doesn't have the required metadata")

	// Step 3: Format the data as required
	validFileData.forEach((entry) => {
		const [key, value] = entry.replace(/\s/g, "").split(":") as [
			(typeof VALID_TITLES)[number],
			string
		]

		infoData[key] = value
	})

	return infoData
}

async function main() {
	// Step 1: Read the branch title from the info file
	const infoFilePath = getFilePath("info.txt")

	const infoFile = await fsPromises.readFile(infoFilePath, {
		encoding: "utf-8",
	})

	const infoFileData = infoFile.split("\n")

	// Step 2: Get the valid info data and branch name
	const infoData = getInfoFileData(infoFileData)
	const branchName = process.env.BRANCH_NAME

	if (!branchName)
		throw new Error("The branch name is not present in the env variables")

	const properBranchName = branchName[0]
		.toUpperCase()
		.concat(branchName.toLowerCase().replace("_", " ").slice(1))

    // Step 3: Form the entry title
    const title = `${properBranchName}: ${infoData.topic}`
    console.log({title})
}

main()
