import { describe, expect, test } from "vitest";
import { getFilePath } from "~/.github/scripts/update-readme";
import path from "node:path"

describe("getFilePath function", () => {
    test("It should return the correct path relative to the root", () => {
        const fileName = "vitest.config.ts"
        const filePath = getFilePath(fileName)
        const correctPath = path.resolve(__dirname, "..", "..", "..", fileName)

        expect(filePath).toBe(correctPath)
    })
})