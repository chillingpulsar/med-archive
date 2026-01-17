<script lang="ts">
	import Login from './(components)/login/login.svelte';
	import Register from './(components)/register/register.svelte';
	import ForgotPwd from './(components)/forgot-pwd/forgot-pwd.svelte';
	import { page } from '$app/state';

	const params = $derived(page.url.searchParams.get('q'));
</script>

<main class="grid min-h-screen md:grid-cols-2">
	<secttion>
		<h1>MedArchive</h1>
		<p>Your Personal Medical Archive</p>
	</secttion>

	{#if params === 'register'}/>
		<Register />
	{:else if params === 'forgot-pwd'}
		<ForgotPwd />
	{:else}
		<Login />
	{/if}
</main>
