interface RippleOptions {
	color?: string;
	duration?: number;
}

export function ripple(node: HTMLElement, options: RippleOptions = {}) {
	const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const handlePointerDown = (event: PointerEvent) => {
		if (reduceMotion) return;
		// Prefer ripple for touch or primary pointer interactions
		if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;

		const rect = node.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height) * 1.4;
		const ripple = document.createElement('span');
		ripple.className = 'ripple-effect';
		ripple.style.width = `${size}px`;
		ripple.style.height = `${size}px`;
		ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
		ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
		ripple.style.background = options.color ?? 'rgba(139, 92, 246, 0.35)';
		ripple.style.animationDuration = `${options.duration ?? 420}ms`;

		node.appendChild(ripple);

		ripple.addEventListener('animationend', () => {
			ripple.remove();
		});
	};

	node.style.position = node.style.position || 'relative';
	node.style.overflow = 'hidden';

	node.addEventListener('pointerdown', handlePointerDown);

	return {
		destroy() {
			node.removeEventListener('pointerdown', handlePointerDown);
		}
	};
}
