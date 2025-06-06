/** A type for the env variables supported in the github workflows */
export type WorkflowEnvType = Partial<{
    /** A string containing all contributors of the repo, comma-separated for each contributor */
    CONTRIBUTORS: string
    /** The user who triggered the workflow */
    ACTOR: string
    /** The period at which the event was triggered, in ISO-8601 format */
    LAST_UPDATED_AT: string
    /** The name of the branch currently processing the workflow */
    BRANCH_NAME: string
}>

/** A type for the env supported in the repo */
export type EnvType = WorkflowEnvType

declare global{
    namespace NodeJS{
        interface ProcessEnv extends EnvType{}
    }
}