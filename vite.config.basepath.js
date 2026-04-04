import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

export default defineConfig({
  base: "/portal/test",
  plugins: [
    federation({
      name: "repro",
      remotes: {},
      shared: [],
    }),
  ],
});
