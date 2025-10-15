interface TiltOptions {
	maxTilt?: number;
	scale?: number;
	hoverScale?: number;
}

export function tilt(node: HTMLElement, options: TiltOptions = {}) {
	const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduceMotion) {
		return {};
	}

	const maxTilt = options.maxTilt ?? 4;
	const scale = options.scale ?? 1;
	const hoverScale = options.hoverScale ?? 1.02;

	let frame = 0;
	let isHovering = false;

	node.style.transition = 'transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1)';
	node.style.transformStyle = 'preserve-3d';

	const setTransform = (xTilt: number, yTilt: number, zScale: number) => {
		node.style.transform = `perspective(900px) rotateX(${xTilt}deg) rotateY(${yTilt}deg) scale(${zScale})`;
	};

	const handlePointerMove = (event: PointerEvent) => {
		const rect = node.getBoundingClientRect();
		const relX = (event.clientX - rect.left) / rect.width;
		const relY = (event.clientY - rect.top) / rect.height;
		const tiltX = (maxTilt / 2 - relY * maxTilt).toFixed(2);
		const tiltY = ((relX * maxTilt - maxTilt / 2) * 0.9).toFixed(2);
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			setTransform(Number(tiltX), Number(tiltY), hoverScale);
			node.style.setProperty('--tilt-x', tiltX);
			node.style.setProperty('--tilt-y', tiltY);
		});
	};

	const reset = () => {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			setTransform(0, 0, scale);
			node.style.removeProperty('--tilt-x');
			node.style.removeProperty('--tilt-y');
		});
	};

	const handlePointerEnter = () => {
		isHovering = true;
	};

	const handlePointerLeave = () => {
		isHovering = false;
		reset();
	};

	node.addEventListener('pointermove', handlePointerMove);
	node.addEventListener('pointerdown', handlePointerMove);
	node.addEventListener('pointerenter', handlePointerEnter);
	node.addEventListener('pointerleave', handlePointerLeave);
	node.addEventListener('pointerup', handlePointerLeave);

	return {
		update(newOptions: TiltOptions) {
			if (typeof newOptions?.maxTilt === 'number') {
				(options as TiltOptions).maxTilt = newOptions.maxTilt;
			}
		},
		destroy() {
			cancelAnimationFrame(frame);
			node.removeEventListener('pointermove', handlePointerMove);
			node.removeEventListener('pointerdown', handlePointerMove);
			node.removeEventListener('pointerenter', handlePointerEnter);
			node.removeEventListener('pointerleave', handlePointerLeave);
			node.removeEventListener('pointerup', handlePointerLeave);
		}
	};
}
