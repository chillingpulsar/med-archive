import { z } from 'zod/v4';

export const loginSchema = z.object({
	email: z.email('Must enter a valid email address'),
	pwd: z.string().min(1, 'Must enter a password')
});

export type LoginSchema = z.infer<typeof loginSchema>;
