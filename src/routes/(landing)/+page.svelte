<script lang="ts">
	import Login from './(components)/login/login.svelte';
	import Register from './(components)/register/register.svelte';
	import ForgotPwd from './(components)/forgot-pwd/forgot-pwd.svelte';
	import { page } from '$app/state';

	const { data } = $props();

	const params = $derived(page.url.searchParams.get('q'));
</script>

<main class="container grid min-h-screen p-4 md:grid-cols-2">
	<secttion class="flex flex-col items-center justify-center gap-2">
		<div class="mt-auto grid max-w-sm gap-2.5 text-center md:mt-0">
			<h1 class="text-4xl font-bold">MedArchive</h1>
			<p class="text-sm text-muted-foreground">
				Track your health and medications with ease in one place with AI-powered insights
			</p>

			<div class="mt-2 hidden h-100 w-full rounded-lg bg-secondary md:block"></div>
		</div>
	</secttion>

	{#if params === 'register'}
		<Register registerForm={data.registerForm} />
	{:else if params === 'forgot-pwd'}
		<ForgotPwd />
	{:else}
		<Login loginForm={data.loginForm} />
	{/if}
</main>
