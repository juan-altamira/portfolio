<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		rel="preconnect"
		href="https://fonts.googleapis.com"
	/>
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="relative min-h-screen bg-canvas text-neutral-100">
	<div class="pointer-events-none absolute inset-0 bg-grid-fade bg-[size:100px_100px] opacity-30 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0))]"></div>

	<main class="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-6 pb-16 pt-10 lg:px-10">
		{@render children?.()}
	</main>
</div>
