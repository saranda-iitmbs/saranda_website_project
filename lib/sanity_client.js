import { createClient } from "next-sanity";

export const sanityclient = createClient({
  projectId: process.env.PROJECTID,
  dataset: process.env.DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});