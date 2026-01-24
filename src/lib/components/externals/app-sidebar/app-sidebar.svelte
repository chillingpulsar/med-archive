<script lang="ts">
	import IconChartColumnBig from '@lucide/svelte/icons/chart-column-big';
	import IconNotebookText from '@lucide/svelte/icons/notebook-text';

	import NavRecentViewed from './components/nav-recent-viewed/nav-recent-viewed.svelte';
	import NavMain from './components/nav-main/nav-main.svelte';
	import NavUser from './components/nav-user/nav-user.svelte';
	import * as Sidebar from '$lib/components/internals/sidebar/index';
	import type { ComponentProps } from 'svelte';

	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
		},
		navMain: [
			{
				title: 'Dashboard',
				url: '/dashboard',
				icon: IconChartColumnBig
			},
			{
				title: 'Records',
				url: '/records',
				icon: IconNotebookText
			}
		],

		recentViewed: [
			{
				name: 'Pasig General Hospital',
				url: '#'
			},
			{
				name: 'Rizal Medical Center',
				url: '#'
			},
			{
				name: 'Makati Medical Center',
				url: '#'
			}
		]
	};
	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="h-fit! data-[slot=sidebar-menu-button]:p-1.5!">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<div class="size-10 rounded-full bg-primary"></div>
							<span class="text-base font-semibold">Med Archive</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavRecentViewed items={data.recentViewed} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
