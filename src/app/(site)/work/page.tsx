import WorkPageClient from "@/components/WorkPageClient";
import { getPageMetadata } from "@/lib/metadata";
import { getProjects } from "@/sanity/projects";

export const metadata = getPageMetadata({
  path: "/work",
  title: "Work",
  description:
    "Reels, shoots, websites and brand identities made by Nau K Do, a social-first creative agency.",
});

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <WorkPageClient
      projects={projects}
      isSampleData={projects.some((p) => p.type === "placeholder")}
    />
  );
}
