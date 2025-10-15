<script lang="ts">
 import { createEventDispatcher, onMount } from 'svelte';
 import SlideInPicture from '$lib/components/SlideInPicture.svelte';
 import { reveal, tilt, ripple } from '$lib';
 import type { Project } from '$lib/data/projects';

 export let project: Project;
 export let active = false;

 let wrapper: HTMLElement;
 let isVisible = false;
 const dispatch = createEventDispatcher<{ visible: { slug: string; visible: boolean } }>();

 onMount(() => {
 	if (typeof window === 'undefined') return;
 	const observer = new IntersectionObserver(
 		(entries) => {
 			entries.forEach((entry) => {
 				isVisible = entry.isIntersecting;
 				dispatch('visible', { slug: project.slug, visible: isVisible });
 			});
 		},
 		{ threshold: 0.6 }
 	);
 	observer.observe(wrapper);
 	return () => observer.disconnect();
 });
</script>

<article
 bind:this={wrapper}
 class="project-card group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-surface/60 p-6 backdrop-blur-[18px] transition duration-500 sm:p-8"
 use:tilt={{ maxTilt: 3.2, scale: 1, hoverScale: 1.02 }}
 class:active={active}
 class:flagship={project.highlight}
>
	<span class="pointer-events-none absolute inset-0 rounded-[2rem] border border-transparent transition duration-500 group-hover:border-primary/70"></span>
	<span class="indicator" aria-hidden="true"></span>
	<span class:visible={isVisible} class="pointer-events-none absolute inset-[-40%] rounded-full bg-gradient-to-r from-primary.glass via-transparent to-transparent opacity-0 transition-[opacity] duration-[700ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]" aria-hidden="true"></span>

 	<div class="relative grid gap-6 sm:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)]">
		<div
			class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition duration-500 group-hover:border-primary/70"
			style="--reveal-delay: var(--reveal-delay, 0s); --slide-x: 120px; --reveal-duration: 0.78s"
			use:reveal={{ direction: 'left' }}
		>
			<div class="parallax-layer">
				<SlideInPicture
					src={project.image}
					alt={`Mockup ilustrativo de ${project.title}`}
					direction="left"
					aspectRatio="16/9"
					imgClass="object-cover rounded-[1.4rem]"
				/>
			</div>
		</div>

		<div
			class="flex flex-col justify-between gap-6 text-balance"
			style="--reveal-delay: calc(var(--reveal-delay, 0s) + 0.1s); --slide-y: 100px; --reveal-duration: 0.8s"
			use:reveal={{ direction: 'up' }}
		>
			<header class="space-y-4">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div class="flex flex-col gap-2">
						{#if project.highlight}
							<span class="flagship-badge">Proyecto insignia</span>
						{/if}
					<span class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary-soft">
						{project.role}
					</span>
					</div>
					{#if project.kpi}
						<span class="kpi-badge inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
							{project.kpi}
						</span>
					{/if}
				</div>
				<h3 class="text-[1.95rem] font-semibold leading-[1.18] text-white">{project.title}</h3>
				<p class="text-sm text-text-secondary sm:text-base">{project.description}</p>
			</header>

			<div class="flex flex-wrap gap-2">
				{#each project.tags as tag, index}
					<span class="chip" style={`--chip-index:${index}`}>{tag}</span>
				{/each}
			</div>

			<a
				href={project.url}
				target="_blank"
				rel="noopener noreferrer"
				class="ink-button mt-2 inline-flex w-full items-center justify-center gap-2 sm:w-auto"
				use:ripple={{ color: 'rgba(139,92,246,0.25)', duration: 360 }}
				aria-label={`Visitar proyecto ${project.title}`}
			>
				Visitar proyecto
				<span aria-hidden="true" class="external-arrow transition-transform duration-300 group-hover:translate-x-1">↗</span>
			</a>
		</div>
	</div>
</article>
