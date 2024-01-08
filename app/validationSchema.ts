import { z } from "zod";
import { Status } from "@prisma/client";

type StatusType = Status

export const issueSchema = z.object({
  // z.string().min(1, "Title is required").max(255) -> custom error message
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().min(1, "Description is required").max(65535).optional(),
  // status: z.custom<string>((val) => { 
  //   return val === Status.CLOSED || val === Status.OPEN
  // },"Only Accept OPEN, IN_PROGRESS, and CLOSED Status").optional(),
  status: z.nativeEnum(Status).optional(),
  assignedToUserId: z.string().min(1).optional().nullable()
});