import WorkPageClient from "@/components/WorkPageClient";
import { getProjects } from "@/sanity/projects";

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <WorkPageClient
      projects={projects}
      isSampleData={projects.some((p) => p.type === "placeholder")}
    />
  );
}
