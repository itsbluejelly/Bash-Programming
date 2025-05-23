import {test, expect, describe, afterEach} from "vitest"
import { isAuthorised } from "~/.github/scripts/validate-contributor"
import { mockProcessEnv, originalEnv } from "./setup"

describe("Validate Contributors", () => {
    test("It should throw an error if no contributors are found", () => {
        mockProcessEnv.mockImplementationOnce(() => ({
            ...originalEnv,
            CONTRIBUTORS: ""
        }))

        expect(() => isAuthorised("")).toThrowError(/contributors not found/i)
    })

    test("It should return false if the actor is invalid", () => {
        const isAuthorisedValue = isAuthorised("")
        expect(isAuthorisedValue).toBe(false)
    })

    test("It should return true if the actor is valid", () => {
		const isAuthorisedValue = isAuthorised("itsbluejelly")
		expect(isAuthorisedValue).toBe(true)
	})
})