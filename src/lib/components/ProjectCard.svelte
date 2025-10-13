<script lang="ts">
	import SlideInPicture from '$lib/components/SlideInPicture.svelte';
	import { reveal } from '$lib/actions/reveal';
	import type { Project } from '$lib/data/projects';

	export let project: Project;
</script>

<article
	class="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-black/20 p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow sm:flex-row sm:p-8"
>
	<div class="flex-1" style="--reveal-delay: var(--reveal-delay, 0s); --slide-x: 160px; --reveal-duration: 1.12s; --reveal-rotate: -1.6deg; --reveal-scale: 0.92" use:reveal={{ direction: 'left' }}>
		<SlideInPicture
			src={project.image}
			alt={`Mockup ilustrativo de ${project.title}`}
			direction="left"
			aspectRatio="16/10"
			imgClass="object-cover"
		/>
	</div>

	<div
		class="flex flex-1 flex-col justify-between text-balance"
		style="--reveal-delay: calc(var(--reveal-delay, 0s) + 0.08s); --slide-y: 120px; --reveal-duration: 1.08s; --reveal-rotate: 1.6deg; --reveal-scale: 0.92"
		use:reveal={{ direction: 'up' }}
	>
		<header class="space-y-3">
			<span class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
				{project.role}
			</span>
			<h3 class="text-2xl font-semibold text-white sm:text-3xl">{project.title}</h3>
			<p class="text-sm text-neutral-300 sm:text-base">{project.description}</p>
		</header>

		<div class="mt-5 flex flex-wrap gap-2">
			{#each project.tags as tag}
				<span class="rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-300 ring-1 ring-white/10">
					{tag}
				</span>
			{/each}
		</div>

		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			class="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-primary hover:text-black"
		>
			Visitar proyecto
			<span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">↗</span>
		</a>
	</div>
</article>
