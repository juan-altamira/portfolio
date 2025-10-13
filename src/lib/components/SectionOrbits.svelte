<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	export let intensity = 0.4;
	export let scale = 1;

	let container: HTMLDivElement | null = null;
	let frame = 0;

	onMount(() => {
		if (typeof window === 'undefined' || !container) return;

		const el = container;
		const scene = new THREE.Scene();
		scene.background = null;

		const width = el.clientWidth;
		const height = el.clientHeight;

		const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
		camera.position.set(0, 0, 8);

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(width, height);
		el.appendChild(renderer.domElement);

		const ringGeometry = new THREE.TorusGeometry(2.5 * scale, 0.04, 16, 200);
		const ringMaterial = new THREE.MeshBasicMaterial({
			color: '#7c5cff',
			transparent: true,
			opacity: 0.35 * intensity
		});
		const ring = new THREE.Mesh(ringGeometry, ringMaterial);
		ring.rotation.x = Math.PI / 2.4;
		scene.add(ring);

		const glowGeometry = new THREE.RingGeometry(2.1 * scale, 2.6 * scale, 90);
		const glowMaterial = new THREE.MeshBasicMaterial({
			color: '#58ffc5',
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.18 * intensity
		});
		const glow = new THREE.Mesh(glowGeometry, glowMaterial);
		glow.rotation.x = Math.PI / 2;
		scene.add(glow);

		const particleGeometry = new THREE.BufferGeometry();
		const count = Math.floor(250 * intensity);
		const positions = new Float32Array(count * 3);
		const speeds = new Float32Array(count);

		for (let i = 0; i < count; i++) {
			const angle = Math.random() * Math.PI * 2;
			const radius = (1.8 + Math.random() * 1.4) * scale;
			const y = (Math.random() - 0.5) * 1.3 * scale;
			positions[i * 3] = Math.cos(angle) * radius;
			positions[i * 3 + 1] = y;
			positions[i * 3 + 2] = Math.sin(angle) * radius;
			speeds[i] = 0.0008 + Math.random() * 0.0015;
		}

		particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		const particleMaterial = new THREE.PointsMaterial({
			color: '#a48aff',
			size: 0.045,
			transparent: true,
			opacity: 0.65 * intensity
		});
		const particles = new THREE.Points(particleGeometry, particleMaterial);
		scene.add(particles);

		const light = new THREE.PointLight('#ffffff', 0.6 * intensity, 10);
		light.position.set(0, 3, 6);
		scene.add(light);

		const animate = () => {
			ring.rotation.z += 0.004;
			glow.rotation.z -= 0.002;

			const attr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
			for (let i = 0; i < count; i++) {
				const idx = i * 3;
				const speed = speeds[i];
				const x = attr.array[idx];
				const z = attr.array[idx + 2];
				const angle = speed * frame * 40;
				attr.array[idx] = x * Math.cos(angle) - z * Math.sin(angle);
				attr.array[idx + 2] = x * Math.sin(angle) + z * Math.cos(angle);
			}
			attr.needsUpdate = true;

			renderer.render(scene, camera);
			frame = requestAnimationFrame(animate);
		};

		const onResize = () => {
			if (!container) return;
			const w = container.clientWidth;
			const h = container.clientHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};

		window.addEventListener('resize', onResize);
		animate();

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('resize', onResize);
			renderer.dispose();
			ringGeometry.dispose();
			ringMaterial.dispose();
			glowGeometry.dispose();
			glowMaterial.dispose();
			particleGeometry.dispose();
			particleMaterial.dispose();
			if (container?.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}
		};
	});
</script>

<div class="section-orbits" bind:this={container} aria-hidden="true"></div>

<style>
	.section-orbits {
		position: absolute;
		inset: 0;
		z-index: 0;
		opacity: 0.65;
		pointer-events: none;
		mix-blend-mode: screen;
	}
</style>
