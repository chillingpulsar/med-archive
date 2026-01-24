<script lang="ts">
	import IconCirclePlus from '@lucide/svelte/icons/circle-plus';
	import IconMail from '@lucide/svelte/icons/mail';
	import { Button } from '$lib/components/internals/button/index';
	import * as Sidebar from '$lib/components/internals/sidebar/index';
	import Darkmode from '$lib/components/externals/darkmode/darkmode.svelte';

	let { items }: { items: { title: string; url: string; icon?: typeof IconCirclePlus }[] } =
		$props();
</script>

<Sidebar.Group>
	<Sidebar.GroupContent class="flex flex-col gap-2">
		<Sidebar.Menu>
			<Sidebar.MenuItem class="flex items-center gap-2">
				<Sidebar.MenuButton
					class="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
					tooltipContent="Quick create"
				>
					<IconCirclePlus />
					<span>Quick New Record</span>
				</Sidebar.MenuButton>
				<!-- <Button
					size="icon"
					class="size-8 group-data-[collapsible=icon]:opacity-0"
					variant="outline"
				>
					<Darkmode />
				</Button> -->
				<Darkmode />
			</Sidebar.MenuItem>
		</Sidebar.Menu>
		<Sidebar.Menu>
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent={item.title}>
						{#if item.icon}
							<item.icon />
						{/if}
						<span>{item.title}</span>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
