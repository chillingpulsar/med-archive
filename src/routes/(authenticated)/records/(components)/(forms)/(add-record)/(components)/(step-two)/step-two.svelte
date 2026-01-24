<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { AddRecordSchema } from '../../../../../schema';

	interface Props {
		form: SuperForm<AddRecordSchema>;
		stepState: {
			one: boolean;
			two: boolean;
			three: boolean;
		};
	}

	let { form, stepState = $bindable() }: Props = $props();

	const { form: formData } = $derived(form);
</script>
