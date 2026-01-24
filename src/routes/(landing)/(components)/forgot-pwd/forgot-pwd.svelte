<script lang="ts">
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { forgotPwdSchema, type ForgotPwdSchema } from '../../schema';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import * as Form from '$lib/components/internals/form/index';
	import { Input } from '$lib/components/internals/input/index';
	import Button from '$lib/components/internals/button/button.svelte';

	interface Props {
		forgotPwdForm: SuperValidated<ForgotPwdSchema>;
	}

	const { forgotPwdForm }: Props = $props();

	// svelte-ignore state_referenced_locally
	const form = superForm(forgotPwdForm, {
		validators: zod4Client(forgotPwdSchema),
		id: crypto.randomUUID(),
		onUpdate: ({ result }) => {
			const { status, data } = result;

			switch (status) {
				case 200:
					console.log(data);
					break;

				case 401:
					console.log(data);
					break;
			}
		}
	});

	const { form: formData, enhance, submitting, delayed } = form;
</script>

<section class="flex flex-col items-center justify-center p-4">
	<form action="?/loginEvent" method="POST" use:enhance class="flex w-full max-w-sm flex-col gap-4">
		<div class="mb-4 grid gap-2">
			<h1 class="text-4xl font-bold">Forgot Password</h1>
			<p class="text-sm text-muted-foreground">Enter your email to reset your password</p>
		</div>

		<Form.Field {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Email</Form.Label>
					<Input
						type="email"
						{...props}
						bind:value={$formData.email}
						placeholder="example@email.com"
					/>
				{/snippet}
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>

		<Form.Button>Reset Password</Form.Button>

		<div class="mt-4 flex flex-col items-center justify-center gap-2">
			<p class="text-sm text-muted-foreground">Remember your password?</p>
			<Button variant="link" href="/">Log in here</Button>
		</div>
	</form>
</section>
