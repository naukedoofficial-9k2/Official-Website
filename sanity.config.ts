"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { project } from "./src/sanity/schemas/project";

export default defineConfig({
  name: "nau-k-do",
  title: "Nau K Do",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: [project] },
  plugins: [structureTool()],
});
