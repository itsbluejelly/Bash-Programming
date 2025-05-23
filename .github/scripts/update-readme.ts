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
const VALID_TITLES = ["topic", ] as const

/**
 * A function to get the platform-independent path to a specific file
 * @returns The path to the file
 */
const getFilePath = (fileName: string) =>
	path.join(__dirname, "..", "..", fileName)

/**
 * A function that gets the indices of the tutorial markers in a specified file, and throws an error if either is not present
 * @param fileData The file's data to parse through, in an array format
 * @returns An object with the indices on the tutorial markers
 */
function getTutorialMarkerIndices(fileData: string[]) {
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
		getTutorialMarkerIndices(markdownFileData)

	// Step 2: Get the list of tutorials(take note of the marker)
	const startIndex = tutorialStart + 1
	const tutorials = markdownFileData.slice(startIndex, tutorialEnd)

	return tutorials
}

/**
 * A function that appends a given tutorial to the current tutorials, and writes it to the tutorial section in the order specified
 * @param tutorial The string of the tutorial to add
 * @param currentTutorials The list of the previous tutorials to append to
 * @param order The order to write the new tutorials after appending, can be `asc` or `desc` and defaults to `asc`
 */
async function appendTutorial(
	tutorial: string,
	currentTutorials: string[],
	order: "asc" | "desc" = "asc"
) {
	// Step 1: Add to the current tutorials and sort in the specified order
	currentTutorials.push(tutorial.trim())

	currentTutorials.sort((firstTutorial, secondTutorial) => {
		// Get the matches
		const regex = /Lesson (\d+)|lesson_(\d+)/
		const firstMatch = firstTutorial.match(regex)
		const secondMatch = secondTutorial.match(regex)

		// Get the lesson numbers
		const firstTutorialLesson = firstMatch?.[1] ?? firstMatch?.[2]
		const secondTutorialLesson = secondMatch?.[1] ?? secondMatch?.[2]

		// Convert the lessons to numbers
		const firstTutorialLessonNo = parseInt(firstTutorialLesson ?? "")
		const secondTutorialLessonNo = parseInt(secondTutorialLesson ?? "")

		// Sort based on order
		return order === "asc"
			? firstTutorialLessonNo - secondTutorialLessonNo
			: secondTutorialLessonNo - firstTutorialLessonNo
	})

	// Step 2: Get the file path and the tutorial indices
	const markdownFilePath = getFilePath("README.md")

	const markdownFile = await fsPromises.readFile(markdownFilePath, {
		encoding: "utf-8",
	})

	const markdownFileData = markdownFile.split("\n")

	const { tutorialStart, tutorialEnd } =
		getTutorialMarkerIndices(markdownFileData)

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
 * @param fileData The data present in the file, in an array format
 * @returns An object with the valid data
 */
function getInfoFileData(fileData: string[]) {
	// Step 1: Declare the info data object
	const infoData: Partial<Record<(typeof VALID_TITLES)[number], string>> = {}

	// Step 2: Populate the info data object
	for (const entry of fileData) {
		// Ensure the entry is in a valid format, and skip if the entry has no key, no value or isn't a valid title
		const [key, value] = entry.split(":") as [
			keyof typeof infoData,
			string
		]

		if (!key || !value || !VALID_TITLES.includes(key)) continue

		// Add to the data only if it doesn't exist
		const validKey = key.trim() as keyof typeof infoData
		const validValue = value.trim()
		if (!infoData[validKey]) infoData[validKey] = validValue
	}

	if (!Object.keys(infoData).length) {
		throw new Error("The info file doesn't have the required metadata")
	}

	return infoData
}

async function main() {
	// Step 1: Read the info file
	const infoFilePath = getFilePath("info.txt")

	const infoFile = await fsPromises.readFile(infoFilePath, {
		encoding: "utf-8",
	})

	const infoFileData = infoFile.split("\n")

	// Step 2: Get the valid info data and branch name
	const infoData = getInfoFileData(infoFileData)
	const branchName = process.env.BRANCH_NAME

	if (!branchName) {
		throw new Error("The branch name is not present in the env variables")
	}

	const regex = /^lesson_\d+$/

	if(!regex.test(branchName)){
		throw new Error("The branch name is not in the required format")
	}

	const properBranchName = branchName[0]
		?.toUpperCase()
		.concat(branchName.toLowerCase().replace("_", " ").slice(1))

	// Step 3: Form the markdown entry title
	const title = `${properBranchName}: ${infoData.topic}`
	const entry = `- [${title}](https://github.com/itsbluejelly/Bash-Programming/tree/${branchName})`

	// Step 4: Edit the markdown only if the
	const oldTutorials = await readTutorialList()

	if (!oldTutorials.some((tutorial) => tutorial.includes(title))) {
		await appendTutorial(entry, oldTutorials)
	} else {
		throw new Error(`Tutorial ${title} already exists`)
	}
}

main()
