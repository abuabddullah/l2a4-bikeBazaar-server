import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: z.string().min(6),
  }),
});

export const changeUserStatusSchema = z.object({
  body: z.object({
    targetUserId: z.string(),
    status: z.string(),
  }),
});
