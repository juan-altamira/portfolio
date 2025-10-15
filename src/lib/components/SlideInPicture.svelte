<script lang="ts">
	import { reveal, type RevealDirection } from '$lib/actions/reveal';

	export let src: string;
	export let alt: string;
	export let direction: RevealDirection = 'up';
	export let aspectRatio: string | null = '16/9';
	export let imgClass = 'object-cover';

	const style = aspectRatio ? `aspect-ratio: ${aspectRatio};` : undefined;
</script>

<div
	class="overflow-hidden rounded-3xl border border-white/10 bg-canvas-soft/40 shadow-lg shadow-primary/10 backdrop-blur-md"
	use:reveal={{ direction }}
	style={style}
>
	<img src={src} alt={alt} class={`w-full h-full ${imgClass}`} loading="lazy" />
</div>
