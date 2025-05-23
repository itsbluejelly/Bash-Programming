import { beforeAll, afterAll, vi, type MockInstance } from "vitest"

/** The original process.env which is not mocked */
export const originalEnv = process.env

/** A mock for the process.env, which is initialised before all tests and restred to its original form after them */
export let mockProcessEnv: MockInstance<() => NodeJS.ProcessEnv>

beforeAll(() => {
	mockProcessEnv = vi.spyOn(process, "env", "get")

	mockProcessEnv.mockReturnValue({
		...originalEnv,
		ACTOR: "itsbluejelly",
		CONTRIBUTORS: "itsbluejelly, personA",
	})
})

afterAll(() => mockProcessEnv.mockRestore())
