<script lang="ts">
	import { page } from '$app/state';
	import { getContentHeaderCTX } from '$lib/components/externals/app-sidebar/components/content-header/state.svelte';

	const contentHeaderState = getContentHeaderCTX();

	contentHeaderState.title = 'Dashboard';
</script>

<main class="flex flex-col gap-4">
	<section>
		<div class="flex w-fit flex-col gap-1 border p-4">
			<p>Total Records: 10</p>
		</div>
	</section>

	<!--Patient Information-->
	<section class="flex flex-col gap-2 border p-4">
		<h1 class="text-2xl font-bold">Patient Information</h1>
		<div class="flex flex-col gap-1">
			<p>Name: John Doe</p>
			<p>Age: 30</p>
			<p>Gender: Male</p>
			<p>Age / Date of Birth: 1990-01-01</p>
			<p>Blood Type: A+</p>
		</div>
	</section>

	<section class="flex flex-col gap-2 border p-4">
		<!--Generate by AI, based on the patient information and records-->
		<h1 class="text-2xl font-bold">Health Summary</h1>
		<p class="text-base text-muted-foreground">
			Based on your records, Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo provident
			velit laborum tenetur fuga, harum dolor nulla possimus at saepe deserunt itaque eius
			accusantium culpa ut, sed vel veniam beatae.
		</p>
	</section>
</main>
