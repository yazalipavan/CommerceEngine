import { z } from "zod";

export const registerRequestSchema = z.object({
  firstName: z.string().trim().min(2).max(50),

  lastName: z.string().trim().min(2).max(50),

  email: z.string().trim().email(),

  password: z.string().min(8).max(100),
});

export type RegisterRequestDto = z.infer<typeof registerRequestSchema>;
