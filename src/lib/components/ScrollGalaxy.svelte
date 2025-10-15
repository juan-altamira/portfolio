<script lang="ts">
	export let intensity = 0.35;
	export let mode: 'structure' | 'particles' = 'structure';

	const clamped = Math.min(Math.max(intensity, 0.1), 0.45);
	const opacity = clamped;
	const scale = 1 + clamped * 0.4;
</script>

<div
	class="galaxy-shell"
	style={`--galaxy-opacity:${opacity}; --galaxy-scale:${scale};`}
	data-mode={mode}
	aria-hidden="true"
>
	<div class="galaxy-layer base"></div>
	<div class="galaxy-layer glow"></div>
	<div class="galaxy-grid"></div>
</div>

<style>
	.galaxy-shell {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: var(--galaxy-opacity);
		transform: scale(var(--galaxy-scale));
		transition: opacity 400ms var(--ease-standard), transform 600ms var(--ease-standard);
		overflow: hidden;
	}

	.galaxy-layer {
		position: absolute;
		inset: -40%;
		filter: blur(80px);
		animation: galaxy-wave 28s linear infinite;
	}

	.galaxy-layer.base {
		background: radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.55), transparent 60%),
			radial-gradient(circle at 70% 20%, rgba(52, 211, 153, 0.35), transparent 55%),
			radial-gradient(circle at 45% 70%, rgba(139, 92, 246, 0.4), transparent 65%);
	}

	.galaxy-layer.glow {
		opacity: 0.55;
		mix-blend-mode: screen;
		background: radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.45), transparent 65%),
			radial-gradient(circle at 70% 60%, rgba(52, 211, 153, 0.3), transparent 70%);
		animation-duration: 36s;
	}

	.galaxy-grid {
		position: absolute;
		inset: -20%;
		opacity: 0.2;
		background-image:
			repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0, rgba(255, 255, 255, 0.08) 1px, transparent 1px, transparent 32px),
			repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0, rgba(255, 255, 255, 0.08) 1px, transparent 1px, transparent 32px);
		animation: galaxy-grid 22s linear infinite;
	}


	[data-mode='particles'] .galaxy-layer.glow {
		filter: blur(90px);
		animation-duration: 24s;
	}

	@keyframes galaxy-wave {
		0% {
			opacity: 0.85;
			transform: rotate(0deg);
		}

		50% {
			opacity: 1;
			transform: rotate(180deg);
		}

		100% {
			opacity: 0.85;
			transform: rotate(360deg);
		}
	}

	@keyframes galaxy-grid {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
			opacity: 0.2;
		}

		50% {
			transform: translate3d(-12px, -6px, 0) scale(1.04);
			opacity: 0.28;
		}

		100% {
			transform: translate3d(12px, 6px, 0) scale(1);
			opacity: 0.2;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.galaxy-layer,
		.galaxy-grid {
			animation: none;
		}
	}
</style>
