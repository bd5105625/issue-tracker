import { z } from "zod";

export const createIssueSchema = z.object({
  // z.string().min(1, "Title is required").max(255) -> custom error message
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});
