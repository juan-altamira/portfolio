<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { ripple } from '$lib';
	import type { Project } from '$lib/data/projects';

	export let project: Project;
	export let active = false;

	let wrapper: HTMLElement;
	let isVisible = false;
	const dispatch = createEventDispatcher<{ visible: { slug: string; visible: boolean } }>();

	const MAX_CHIPS = 4;
	const visibleTags = project.tags.slice(0, MAX_CHIPS);
	const remainingCount = project.tags.length - MAX_CHIPS;

	onMount(() => {
		if (typeof window === 'undefined') return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isVisible = entry.isIntersecting;
					dispatch('visible', { slug: project.slug, visible: isVisible });
				});
			},
			{ threshold: 0.5 }
		);
		observer.observe(wrapper);
		return () => observer.disconnect();
	});
</script>

<a
	href={project.url}
	target="_blank"
	rel="noopener noreferrer"
	class="pc__link"
>
	<article
		bind:this={wrapper}
		class="pc"
		class:pc--active={active}
		class:pc--flagship={project.highlight}
	>
		<!-- SVG Border Glow Effect -->
		<svg class="pc__border-glow" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="borderGradient-{project.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:rgba(139, 92, 246, 1);stop-opacity:1" />
					<stop offset="33%" style="stop-color:rgba(52, 211, 153, 1);stop-opacity:1" />
					<stop offset="66%" style="stop-color:rgba(109, 40, 217, 1);stop-opacity:1" />
					<stop offset="100%" style="stop-color:rgba(139, 92, 246, 1);stop-opacity:1" />
				</linearGradient>
				<filter id="glow-{project.slug}">
					<feGaussianBlur stdDeviation="8" result="coloredBlur"/>
					<feMerge>
						<feMergeNode in="coloredBlur"/>
						<feMergeNode in="SourceGraphic"/>
					</feMerge>
				</filter>
			</defs>
			<rect class="pc__border-rect" x="1" y="1" rx="24" ry="24" 
				stroke="url(#borderGradient-{project.slug})" 
				stroke-width="3" 
				fill="none"
				filter="url(#glow-{project.slug})"
			/>
		</svg>
		
		<!-- Media rail (izq desktop, arriba mobile) -->
		<div class="pc__media">
			<img 
				src={project.image} 
				alt={project.title}
				class="pc__img"
				loading="lazy"
			/>
		</div>

		<!-- Content rail -->
		<div class="pc__content">
			<!-- Fila 1: Overline -->
			<div class="pc__header">
				<span class="pc__overline">{project.role}</span>
			</div>

			<!-- Fila 2: Título -->
			<h3 class="pc__title">{project.title}</h3>

			<!-- Fila 3: Descripción -->
			<p class="pc__desc">{project.description}</p>

			<!-- Fila 4: Chips -->
			<div class="pc__chips">
				{#each visibleTags as tag}
					<span class="pc__chip">{tag}</span>
				{/each}
				{#if remainingCount > 0}
					<span class="pc__chip pc__chip--more">+{remainingCount}</span>
				{/if}
			</div>

			<!-- Fila 5: CTA -->
			<span
				class="pc__cta"
				use:ripple={{ color: 'rgba(139,92,246,0.2)', duration: 400 }}
			>
				Visitar proyecto
				<svg class="pc__cta-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</span>
		</div>
	</article>
</a>
