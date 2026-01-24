<script lang="ts">
	import * as Sidebar from '$lib/components/internals/sidebar/index';
	import AppSidebar from '$lib/components/externals/app-sidebar/app-sidebar.svelte';
	import ContentHeader from '$lib/components/externals/app-sidebar/components/content-header/content-header.svelte';
</script>

<Sidebar.Provider
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
	<AppSidebar variant="inset" />
	<Sidebar.Inset class="min-w-0 border">
		<ContentHeader />
		<div class="flex flex-col gap-4 p-4 md:p-6">
			<h1>Hello World</h1>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
