import { z } from 'zod/v4';

const baseSchema = {
	email: z.email('Must enter a valid email address')
};

export const loginSchema = z.object(baseSchema).extend({
	pwd: z.string().min(1, 'Must enter a password')
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
	.object(baseSchema)
	.extend({
		firstName: z.string().min(1, 'Must enter a first name'),
		middleName: z.string().min(1, 'Must enter a middle name'),
		lastName: z.string().min(1, 'Must enter a last name'),
		pwd: z.string().min(8, 'Must choose a strong password'),
		confirmPwd: z.string().min(1, 'Must confirm your password')
	})
	.superRefine(({ pwd, confirmPwd }, ctx) => {
		if (pwd !== confirmPwd) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['confirmPwd']
			});
		}
	});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const forgotPwdSchema = z.object(baseSchema);

export type ForgotPwdSchema = z.infer<typeof forgotPwdSchema>;
