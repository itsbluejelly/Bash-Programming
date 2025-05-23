import {defineConfig} from "vitest/config"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [tsConfigPaths()],

    test: {
        include: ["tests/**/*.test.ts"],
        setupFiles: ["tests/unit/workflows/setup.ts"],
        watch: true,
        globalSetup: "tests/unit/global-setup.ts"
    }
})