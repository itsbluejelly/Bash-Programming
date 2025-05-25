export type BranchInfoType = {
	/** The topic of the lesson */
	topic: string
	/** The optional detailed explanation of the lesson, should be of reasonable length */
	description?: string
	/** The optional date at which the branch was last edited. By default, the period when the changes in the `branch-info.json` file were pushed is used. It should be in RFC 7231 format */
	lastUpdated?: string
	/** The optional author of the lesson's github username. By default, its the person who created the branch */
	author?: string
}