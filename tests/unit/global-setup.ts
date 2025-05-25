import fsPromises from "node:fs/promises"
import fs from "node:fs"
import path from "node:path"

/** The path to the OG branch-info file, but when the tests run it becomes the path to the mock */
export const branchInfoFilePath = path.join(__dirname, "..", "..", "branch-info.json")
/** The path to the OG markdown file, but when the tests run it becomes the path to the mock */
export const markdownFilePath = path.join(__dirname, "..", "..", "README.md")

/** The path to the mock branch-info file, but when the tests run it becomes the path to the OG file */
export const newBranchInfoFilePath = path.join(
	__dirname,
	"..",
	"..",
	"real-branch-info.json"
)

/** The path to the mock markdown file, but when the tests run it becomes the path to the OG file */
export const newMarkdownFilePath = path.join(__dirname, "..", "..", "real-README.md")

/**
 * A function that sets up vitest globally, and returns a function that handles the teardown
 * @returns A function that globally tears down vitest
 */
export default async function setupUnitTests() {
	// Step 1: Find the OG files, if any we rename them and copy their content, otherwise we just create the new ones as mocks
    console.log("...Creating mock files and hiding the real ones⏳")
	const branchInfoExists = fs.existsSync(branchInfoFilePath)
	const markdownExists = fs.existsSync(markdownFilePath)

	if (branchInfoExists) {
        console.log("...Working on branch info file⏳")
		await fsPromises.rename(branchInfoFilePath, newBranchInfoFilePath)
		await fsPromises.copyFile(newBranchInfoFilePath, branchInfoFilePath)
        console.log("File created✅")
	} else {
        console.log(
			"...Original branch info file missing, creating empty one😵"
		)

		await fsPromises.writeFile(branchInfoFilePath, "{}", {
			encoding: "utf-8",
		})

        console.log("File created✅")
	}

	if (markdownExists) {
        console.log("...Working on readme⏳")
		await fsPromises.rename(markdownFilePath, newMarkdownFilePath)
		await fsPromises.copyFile(newMarkdownFilePath, markdownFilePath)
        console.log("File created✅")
	} else {
        console.log(
			"...Original readme file missing, creating empty one😵"
		)

		await fsPromises.writeFile(markdownFilePath, "", { encoding: "utf-8" })

        console.log("File created✅")
	}

    console.log("Mock files created and real files secured✅")

	return async function teardownUnitTests() {
		// Step 1: Delete the mock files which have the OG names
        console.log("...Clearing mocks⏳")
		await fsPromises.unlink(branchInfoFilePath)
		await fsPromises.unlink(markdownFilePath)
        console.log("Mocks cleared✅")

		// Step 2: Rename the OG files back to the right names
		const newBranchInfoExists = fs.existsSync(newBranchInfoFilePath)
		const newMarkdownExists = fs.existsSync(newMarkdownFilePath)

		if (newBranchInfoExists){
            console.log("...Restoring real branch info file⏳")
			await fsPromises.rename(newBranchInfoFilePath, branchInfoFilePath)
            console.log("Real branch info file secured✅")
        }else{
			console.log("There was no real branch info file to begin with😵")
		}

		if (newMarkdownExists) {
			console.log("Securing real readme file⏳")
			await fsPromises.rename(newMarkdownFilePath, markdownFilePath)
			console.log("Readme file secured✅")
		} else {
			console.log("There was no real readme file to begin with😵")
		}
	}
}