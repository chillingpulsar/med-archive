import type { Actions, PageServerLoad } from "./$types";
import { addRecordSchema } from "./schema";
import { zod4 } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        addRecordForm: await superValidate(zod4(addRecordSchema))
    }
};

export const actions: Actions = {
    addRecordEvent: async ({ request }) => {
        const form = await superValidate(request, zod4(addRecordSchema));

        if (!form.valid) return fail(400, { form });

        console.log(form.data);

        return { form, msg: 'Record added successfully' };
    }
};