<script lang="ts">
import '../app.css';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/800.css';
import '@fontsource/geist-sans/900.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import { ripple } from '$lib';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen bg-canvas text-text-primary">
	<div class="pointer-events-none absolute inset-0 bg-grid-fade bg-[size:120px_120px] opacity-20 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0))]"></div>

	<nav class="site-nav sticky top-0 z-40 w-full border-b border-white/5 bg-canvas/80 backdrop-blur-xl">
		<div class="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-4 text-sm text-text-muted lg:px-10">
			<a href="#inicio" class="font-semibold tracking-[0.25em] text-xs uppercase text-text-secondary">Juan Pablo Altamira</a>
			<div class="hidden items-center gap-6 md:flex">
				<a href="#proyectos" class="nav-link">Casos</a>
				<a href="#foco" class="nav-link">Valor</a>
				<a href="#proceso" class="nav-link">Proceso</a>
				<a href="#contacto" class="nav-link">Contacto</a>
			</div>
			<a
				href="#contacto"
				class="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-200 hover:border-primary hover:text-primary"
				use:ripple={{ color: 'rgba(139,92,246,0.25)', duration: 360 }}
			>
				Agendar 15’
			</a>
		</div>
	</nav>

	<main class="relative z-10 mx-auto flex min-h-screen max-w-[1200px] flex-col px-6 pb-16 pt-10 lg:px-10">
		{@render children?.()}
	</main>
</div>
