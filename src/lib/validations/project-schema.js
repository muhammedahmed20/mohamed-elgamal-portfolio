import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),

  description: z.string().min(10, "Description is too short."),

  live_link: z.string().url("Enter a valid URL.").optional().or(z.literal("")),

  github_link: z
    .string()
    .url("Enter a valid URL.")
    .optional()
    .or(z.literal("")),

  tech_stack: z.string().optional(),

  image: z.any(),

  is_active: z.boolean(),
  is_featured: z.boolean(),
  category: z.enum(["Frontend", "Full Stack", "CLI"]),
});

export const messageSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),

  phone: z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number",
  }),

  email: z.string().email("Enter a valid email address."),

  topic: z.enum([
    "new-project",
    "freelance",
    "full-time",
    "redesign",
    "bug-fixes",
    "other",
  ]),

  message: z.string().min(10, "Message must be at least 10 characters."),
});

export const callSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),

  email: z.string().email("Enter a valid email address."),

  topic: z.string().min(10, "Message must be at least 10 characters."),

  message: z.string().optional().or(z.literal("")),
});

export const noteSchema = z.object({
  note: z.string().min(3, "Name must be at least 3 characters."),
});
