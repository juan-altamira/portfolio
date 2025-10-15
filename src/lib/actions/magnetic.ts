interface MagneticOptions {
	strength?: number;
}

export function magnetic(node: HTMLElement, options: MagneticOptions = {}) {
	const strength = options.strength ?? 0.35;
	let frame = 0;
	
	// Disable on mobile/touch devices for performance
	const isMobile = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
	if (isMobile) {
		return { destroy() {} };
	}

	const handlePointerMove = (event: PointerEvent) => {
		if (frame) return; // Throttle
		
		const rect = node.getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
		const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

		frame = requestAnimationFrame(() => {
			node.style.transform = `translate3d(${x * strength * 20}px, ${y * strength * 18}px, 0)`;
			frame = 0;
		});
	};

	const reset = () => {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			node.style.transform = '';
		});
	};

	node.addEventListener('pointermove', handlePointerMove);
	node.addEventListener('pointerleave', reset);
	node.addEventListener('pointerup', reset);

	return {
		update(newOptions: MagneticOptions) {
			if (typeof newOptions?.strength === 'number') {
				(options as MagneticOptions).strength = newOptions.strength;
			}
		},
		destroy() {
			cancelAnimationFrame(frame);
			node.removeEventListener('pointermove', handlePointerMove);
			node.removeEventListener('pointerleave', reset);
			node.removeEventListener('pointerup', reset);
		}
	};
}
