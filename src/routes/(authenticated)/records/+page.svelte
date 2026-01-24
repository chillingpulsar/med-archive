<script lang="ts">
	import AddRecord from './(components)/(forms)/(add-record)/add-record.svelte';
	import DeleteRecord from './(components)/(forms)/(delete-record)/delete-record.svelte';
	import UpdateRecord from './(components)/(forms)/(update-record)/update-record.svelte';
	import { getContentHeaderCTX } from '$lib/components/externals/app-sidebar/components/content-header/state.svelte';

	const contentHeaderState = getContentHeaderCTX();

	contentHeaderState.title = 'Records';

	const { data } = $props();
</script>

<main class="flex flex-col gap-4 p-4 md:p-6">
	<AddRecord addRecordForm={data.addRecordForm} />
</main>
