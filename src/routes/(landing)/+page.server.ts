import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { loginSchema } from './schema';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		loginForm: await superValidate(zod4(loginSchema))
	};
};

export const actions: Actions = {
	loginEvent: async ({ request }) => {
		const form = await superValidate(request, zod4(loginSchema));

		if (!form.valid) return fail(400, { form });

		console.log(form.data);

		return { form, msg: 'Login successful' };
	}
};
