import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "html"],
      all: true,
      include: ["src/**/*.{ts,tsx,js}"],
      exclude: [
        "node_modules",
        "tests/**/*",
        "vite.config.ts",
        "src/interfaces/",
      ],
    },
  },
});
