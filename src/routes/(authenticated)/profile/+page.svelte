<script lang="ts">
	import { getContentHeaderCTX } from '$lib/components/externals/app-sidebar/components/content-header/state.svelte';

	const contentHeaderState = getContentHeaderCTX();

	contentHeaderState.title = 'Profile';
</script>
