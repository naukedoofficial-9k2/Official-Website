import HomePageClient from "@/components/HomePageClient";
import { getProjects } from "@/sanity/projects";

export default async function HomePage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);

  return (
    <HomePageClient
      featuredProjects={featured.length > 0 ? featured : projects}
      isSampleData={projects.some((p) => p.type === "placeholder")}
    />
  );
}
