export type RevealDirection = 'left' | 'right' | 'up' | 'down';

interface RevealOptions {
	direction?: RevealDirection;
	once?: boolean;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { direction = 'up', once = true } = options;

	node.classList.add('reveal');
	node.dataset.revealDirection = direction;

	const playAnimation = () => {
		node.classList.remove('is-revealed');
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				node.classList.add('is-revealed');
			});
		});
	};

	if (typeof IntersectionObserver === 'undefined') {
		playAnimation();
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				playAnimation();
				if (once) observer.unobserve(node);
			} else if (!once) {
				node.classList.remove('is-revealed');
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
	);

	observer.observe(node);

	return {
		update(newOptions: RevealOptions) {
			if (newOptions?.direction && newOptions.direction !== node.dataset.revealDirection) {
				node.dataset.revealDirection = newOptions.direction;
			}
		},
		destroy() {
			observer.unobserve(node);
		}
	};
}
