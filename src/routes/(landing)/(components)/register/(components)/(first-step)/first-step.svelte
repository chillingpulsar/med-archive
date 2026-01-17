<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { RegisterSchema } from '../../../../schema';
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

	const { form: formData, errors, constraints } = $derived(form);
</script>

<Form.Field {form} name="firstName">
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>First Name</Form.Label>
			<Input
				type="text"
				{...props}
				bind:value={$formData.firstName}
				placeholder="Enter your first name"
			/>
		{/snippet}
	</Form.Control>

	<Form.FieldErrors />
</Form.Field>

<Form.Field {form} name="middleName">
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Middle Name</Form.Label>
			<Input
				type="text"
				{...props}
				bind:value={$formData.middleName}
				placeholder="Enter your middle name"
			/>
		{/snippet}
	</Form.Control>

	<Form.FieldErrors />
</Form.Field>

<Form.Field {form} name="lastName">
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Last Name</Form.Label>
			<Input
				type="text"
				{...props}
				bind:value={$formData.lastName}
				placeholder="Enter your last name"
			/>
		{/snippet}
	</Form.Control>

	<Form.FieldErrors />
</Form.Field>

{#if $formData.firstName.length > 0 && $formData.middleName.length > 0 && $formData.lastName.length > 0 && $errors.firstName === undefined && $errors.middleName === undefined && $errors.lastName === undefined}
	<Button
		onclick={() => {
			stepState.final = true;
			stepState.first = false;
		}}
		type="button">Next</Button
	>
{/if}
