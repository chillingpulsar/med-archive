<script lang="ts">
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { loginSchema, type LoginSchema } from '../../schema';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import * as Form from '$lib/components/internals/form/index';
	import { Input } from '$lib/components/internals/input/index';
	import Button from '$lib/components/internals/button/button.svelte';

	interface Props {
		loginForm: SuperValidated<LoginSchema>;
	}

	const { loginForm }: Props = $props();

	// svelte-ignore state_referenced_locally
	const form = superForm(loginForm, {
		validators: zod4Client(loginSchema),
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

<section class="flex flex-col items-center justify-center">
	<form action="?/loginEvent" method="POST" use:enhance class="flex w-full max-w-sm flex-col gap-4">
		<div class="mb-4 grid gap-2">
			<h1 class="text-4xl font-bold">Log in</h1>
			<p class="text-sm text-muted-foreground">Log in to your account to track your health</p>
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

		<div class="flex flex-col gap-1.5">
			<Form.Field {form} name="pwd">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input
							{...props}
							type="password"
							bind:value={$formData.pwd}
							placeholder="Enter your password"
						/>
					{/snippet}
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<Button variant="link" href="?q=forgot-pwd" class="ml-auto h-fit p-0">Forgot password?</Button
			>
		</div>

		<Form.Button>Log in</Form.Button>

		<div class="mt-4 flex flex-col items-center justify-center gap-2">
			<p class="text-sm text-muted-foreground">Don't have an account?</p>
			<Button variant="link" href="?q=register">Register here</Button>
		</div>
	</form>
</section>
