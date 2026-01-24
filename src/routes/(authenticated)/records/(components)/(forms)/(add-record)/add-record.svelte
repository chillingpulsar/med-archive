<script lang="ts">
	import * as Dialog from '$lib/components/internals/dialog/index';
	import { buttonVariants } from '$lib/components/internals/button';
	import IconCirclePlus from '@lucide/svelte/icons/circle-plus';
	import StepOne from './(components)/(step-one)/step-one.svelte';
	import StepTwo from './(components)/(step-two)/step-two.svelte';
	import StepThree from './(components)/(step-three)/step-three.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { addRecordSchema, type AddRecordSchema } from '../../../schema';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';

	interface Props {
		addRecordForm: SuperValidated<AddRecordSchema>;
	}

	const { addRecordForm }: Props = $props();

	// svelte-ignore state_referenced_locally
	const form = superForm(addRecordForm, {
		validators: zod4Client(addRecordSchema),
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

	let stepState = $state({
		one: true,
		two: false,
		three: false
	});
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default', class: 'ml-auto' })}>
		<IconCirclePlus class="size-4" />
		Add Record
	</Dialog.Trigger>
	<Dialog.Content onInteractOutside={(e) => e.preventDefault()} class="max-w-7xl!">
		<Dialog.Header>
			<Dialog.Title>Add a new record</Dialog.Title>
			<Dialog.Description>Kindly fill the form below to add a new record.</Dialog.Description>
		</Dialog.Header>

		<form>
			<StepOne {form} bind:stepState />
			<StepTwo {form} bind:stepState />
			<StepThree {form} bind:stepState />
		</form>
	</Dialog.Content>
</Dialog.Root>
