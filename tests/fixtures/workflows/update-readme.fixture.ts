import { test } from "vitest"
import fsPromises from "node:fs/promises"
import { branchInfoFilePath, markdownFilePath } from "../../unit/global-setup"

/**
 * A function that gets the mock markdown file's contents
 * @param encoding The optional encoding to use when reading the file, @default `utf-8`
 * @returns The mock markdown file's contents
 */
const getMarkdownFile = async (encoding: BufferEncoding = "utf-8") =>
	await fsPromises.readFile(markdownFilePath, { encoding })

/**
 * A function that gets the mock branch-info file's contents
 * @param encoding The optional encoding to use when reading the file, @default `utf-8`
 * @returns The mock markdown file's contents
 */
const getBranchInfoFile = async (encoding: BufferEncoding = "utf-8") =>
	await fsPromises.readFile(branchInfoFilePath, { encoding })

/**
 * A function that writes data to the mock markdown file
 * @param data The data to write to the file
 * @param encoding The optional encoding to use when writing to the file, @default `utf-8`
 */
const writeMarkdownFile = async (
	data: string,
	encoding: BufferEncoding = "utf-8"
) => await fsPromises.writeFile(markdownFilePath, data, { encoding })

/**
 * A function that writes data to the branch info file
 * @param data The data to write to the file
 * @param encoding The optional encoding to use when writing to the file, @default `utf-8`
 */
const writeBranchInfoFile = async (
	data: string,
	encoding: BufferEncoding = "utf-8"
) => await fsPromises.writeFile(branchInfoFilePath, data, { encoding })

/**
 * The test fixture for the update-readme unit test
 */
const UpdateReadmeTest = test.extend<{
	/**
	 * A function that gets the mock markdown file's contents
	 * @param encoding The optional encoding to use when reading the file, @default `utf-8`
	 * @returns The mock markdown file's contents
	 */
	getMarkdownFile: typeof getMarkdownFile

	/**
	 * A function that gets the mock branch-info file's contents
	 * @param encoding The optional encoding to use when reading the file, @default `utf-8`
	 * @returns The mock markdown file's contents
	 */
	getBranchInfoFile: typeof getBranchInfoFile

	/**
	 * A function that writes data to the mock markdown file
	 * @param data The data to write to the file
	 * @param encoding The optional encoding to use when writing to the file, @default `utf-8`
	 */
	writeMarkdownFile: typeof writeMarkdownFile

	/**
	 * A function that writes data to the branch info file
	 * @param data The data to write to the file
	 * @param encoding The optional encoding to use when writing to the file, @default `utf-8`
	 */
	writeBranchInfoFile: typeof writeMarkdownFile

	/** An object that defines extra settings for the test, with props like
	 * 1. __mode__: Defines how all write functions in the test should handle the changes
	 * 
	 * To handle the changes well, don't destructure this object while updating its value
	 */
	settings: {
		/**
		 * The mode on which changes to all files in the test are handled.
		 *
		 * 1. __`save`__: Used to save changes to the mock file, persisting them after the test is done
		 * 2. __`temp`__: Used to write to the file only for that test, and restores its previous data once its complete
		 *
		 * @default `temp`
		 */
		mode: "temp" | "save"
	}
}>({
	settings: {mode: "temp"},
	getBranchInfoFile: async ({}, use) => use(getBranchInfoFile),
	getMarkdownFile: async ({}, use) => use(getMarkdownFile),

	writeBranchInfoFile: async ({ settings }, use) => {
		const originalContent = await getBranchInfoFile()
		await use(writeBranchInfoFile)
		if (settings.mode === "temp") await writeBranchInfoFile(originalContent)
	},

	writeMarkdownFile: async ({ settings }, use) => {
		const originalContent = await getMarkdownFile()
		await use(writeMarkdownFile)
		if (settings.mode === "temp") await writeMarkdownFile(originalContent)
	},
})

export default UpdateReadmeTest