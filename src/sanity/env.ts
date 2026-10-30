export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-01-01";

// Without a project ID the site keeps working from the sample data in /content
export const isSanityConfigured = Boolean(projectId);
