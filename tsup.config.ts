// Resources
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "cjs",
  bundle: false,
  clean: true,
  splitting: false,
});
