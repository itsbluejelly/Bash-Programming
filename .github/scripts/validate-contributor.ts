function isAuthorised(actor: string){
    // Step 1: Ensure contributors are in proper format
    const contributors: string[] | undefined = process.env.CONTRIBUTORS?.split(",")
    if(!contributors?.length) throw new Error("Contributors not found in the env variables")

    return contributors.includes(actor)
}

function main(){
    // Step 1: Check if a user exists
    const actor = process.env.actor
    if(!actor) throw new Error("Actor not defined in the env variables")

    // Step 2: Confirm user is a valid contributor
    if(!isAuthorised(actor)) throw new Error("The user is not a valid contributor")
}

main()