<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { registerSchema, type RegisterSchema } from '../../../../schema';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import * as Form from '$lib/components/internals/form/index';
	import { Input } from '$lib/components/internals/input/index';
	import Button from '$lib/components/internals/button/button.svelte';

	interface Props {
		form: SuperForm<RegisterSchema>;
		stepState: {
			first: boolean;
			final: boolean;
		};
	}

	let { form, stepState = $bindable() }: Props = $props();

	const { form: formData, enhance, submitting, delayed } = $derived(form);
</script>

<Form.Field {form} name="email">
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Email</Form.Label>
			<Input type="email" {...props} bind:value={$formData.email} placeholder="example@email.com" />
		{/snippet}
	</Form.Control>

	<Form.FieldErrors />
</Form.Field>

<Form.Field {form} name="pwd">
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Password</Form.Label>
			<Input
				type="password"
				{...props}
				bind:value={$formData.pwd}
				placeholder="Enter your password"
			/>
		{/snippet}
	</Form.Control>

	<Form.FieldErrors />
</Form.Field>

<Form.Field {form} name="confirmPwd">
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Confirm Password</Form.Label>
			<Input
				type="password"
				{...props}
				bind:value={$formData.confirmPwd}
				placeholder="Confirm your password"
			/>
		{/snippet}
	</Form.Control>

	<Form.FieldErrors />
</Form.Field>

<div class="grid grid-cols-2">
	<Button
		onclick={() => {
			stepState.first = true;
			stepState.final = false;
		}}
		type="button"
		variant="secondary"
		class="w-fit"
	>
		Back
	</Button>

	<Form.Button class="w-full">Register</Form.Button>
</div>
