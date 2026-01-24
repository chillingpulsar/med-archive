<script lang="ts">
	import Login from './(components)/login/login.svelte';
	import Register from './(components)/register/register.svelte';
	import ForgotPwd from './(components)/forgot-pwd/forgot-pwd.svelte';
	import { page } from '$app/state';
	import AppLogo from '$lib/assets/svgs/app-logo.svg';
	import Darkmode from '$lib/components/externals/darkmode/darkmode.svelte';

	const { data } = $props();

	const params = $derived(page.url.searchParams.get('q'));
</script>

{#snippet LogoSection()}
	<div
		class="mt-auto grid max-w-sm grid-cols-[auto_1fr] gap-2.5 p-4 text-center md:mt-0 md:grid-cols-1 md:p-0"
	>
		<img src={AppLogo} alt="App Logo" class="mx-auto w-24 object-contain" />
		<div class="">
			<h1 class="text-left text-2xl font-bold md:text-center">MedArchive</h1>
			<p class="text-left text-sm text-muted-foreground md:text-center">
				Track your health and medications with ease in one place with AI-powered insights
			</p>
		</div>
	</div>
{/snippet}

<main class="grid min-h-screen md:grid-cols-2">
	<secttion class="hidden flex-col items-center justify-center gap-2 bg-secondary md:flex">
		{@render LogoSection()}
	</secttion>

	<section class="mt-auto md:hidden">
		{@render LogoSection()}
	</section>

	{#if params === 'register'}
		<Register registerForm={data.registerForm} />
	{:else if params === 'forgot-pwd'}
		<ForgotPwd forgotPwdForm={data.forgotPwdForm} />
	{:else}
		<Login loginForm={data.loginForm} />
	{/if}

	<section class="fixed right-4 bottom-4">
		<Darkmode />
	</section>
</main>
