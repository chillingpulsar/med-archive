<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { registerSchema, type RegisterSchema } from '../../schema';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import FirstStep from './(components)/(first-step)/first-step.svelte';
	import FinalStep from './(components)/(final-step)/final-step.svelte';
	import Button from '$lib/components/internals/button/button.svelte';
	import IconUndo2 from '@lucide/svelte/icons/undo-2';

	interface Props {
		registerForm: SuperValidated<RegisterSchema>;
	}

	const { registerForm }: Props = $props();

	// svelte-ignore state_referenced_locally
	const form = superForm(registerForm, {
		validators: zod4Client(registerSchema),
		id: crypto.randomUUID(),
		onUpdate: ({ result }) => {
			const { status, data } = result;

			switch (status) {
				case 200:
					console.log(data);
					break;
				case 400:
					console.log(data);
					break;
			}
		}
	});

	const { form: formData, enhance, submitting, delayed } = form;

	let stepState = $state({
		first: true,
		final: false
	});
</script>

<section class="flex flex-col items-center justify-center p-4">
	<form
		action="?/registerEvent"
		method="POST"
		use:enhance
		class="flex w-full max-w-sm flex-col gap-4"
	>
		<input type="hidden" name="firstName" value={$formData.firstName} />
		<input type="hidden" name="middleName" value={$formData.middleName} />
		<input type="hidden" name="lastName" value={$formData.lastName} />
		<input type="hidden" name="email" value={$formData.email} />
		<input type="hidden" name="pwd" value={$formData.pwd} />
		<input type="hidden" name="confirmPwd" value={$formData.confirmPwd} />

		<div class="mb-4 grid gap-2">
			<h1 class="text-4xl font-bold">Register</h1>
			<p class="text-sm text-muted-foreground">Create an account to track your health</p>
		</div>

		<div class="">
			<Button type="button" variant="link" href="/" class="h-fit p-0!">
				<IconUndo2 class="size-4" />
				Back to login
			</Button>
		</div>

		{#if stepState.first}
			<FirstStep {form} bind:stepState />
		{:else if stepState.final}
			<FinalStep {form} bind:stepState />
		{/if}
	</form>
</section>
