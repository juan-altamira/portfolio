<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';

	let container: HTMLDivElement;
	let frameId: number;

	onMount(() => {
		const { clientWidth, clientHeight } = container;

		const scene = new THREE.Scene();
		scene.background = null;

		const camera = new THREE.PerspectiveCamera(55, clientWidth / clientHeight, 0.1, 100);
		camera.position.set(0, 0, 3.2);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(clientWidth, clientHeight);
		container.appendChild(renderer.domElement);

		const coreGeometry = new THREE.IcosahedronGeometry(1.1, 2);
		const coreMaterial = new THREE.MeshStandardMaterial({
			color: new THREE.Color('#7c5cff'),
			emissive: '#2e1fff',
			metalness: 0.65,
			roughness: 0.25
		});
		const core = new THREE.Mesh(coreGeometry, coreMaterial);
		scene.add(core);

		const wireGeometry = new THREE.IcosahedronGeometry(1.4, 3);
		const wireMaterial = new THREE.LineBasicMaterial({
			color: new THREE.Color('#58ffc5'),
			transparent: true,
			opacity: 0.5
		});
		const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(wireGeometry), wireMaterial);
		scene.add(wireframe);

		const particlesGeometry = new THREE.BufferGeometry();
		const particleCount = 500;
		const positions = new Float32Array(particleCount * 3);
		const speeds = new Float32Array(particleCount);

		for (let i = 0; i < particleCount; i++) {
			const radius = 3 + Math.random() * 2.5;
			const theta = Math.random() * 2 * Math.PI;
			const phi = Math.acos(2 * Math.random() - 1);

			positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = radius * Math.cos(phi);

			speeds[i] = 0.001 + Math.random() * 0.003;
		}

		particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		const particlesMaterial = new THREE.PointsMaterial({
			color: '#a48aff',
			size: 0.035,
			transparent: true,
			opacity: 0.85
		});

		const particles = new THREE.Points(particlesGeometry, particlesMaterial);
		scene.add(particles);

		const ambient = new THREE.AmbientLight('#ffffff', 0.55);
		scene.add(ambient);

		const accent = new THREE.PointLight('#58ffc5', 1.4, 8, 2);
		accent.position.set(2.5, 1.8, 3.5);
		scene.add(accent);

		const rim = new THREE.PointLight('#7c5cff', 1.2, 6, 2);
		rim.position.set(-3, -2.5, 2.5);
		scene.add(rim);

		let time = 0;

		const animate = () => {
			time += 0.01;
			core.rotation.x = Math.sin(time * 0.6) * 0.3;
			core.rotation.y += 0.01;

			wireframe.rotation.x -= 0.004;
			wireframe.rotation.y += 0.006;

			const positionsAttr = particlesGeometry.getAttribute('position') as THREE.BufferAttribute;
			for (let i = 0; i < particleCount; i++) {
				const idx = i * 3;
				const speed = speeds[i];
				const x = positions[idx];
				const y = positions[idx + 1];
				const z = positions[idx + 2];

				const angle = speed * time * 20;
				positionsAttr.array[idx] = x * Math.cos(angle) - z * Math.sin(angle);
				positionsAttr.array[idx + 2] = x * Math.sin(angle) + z * Math.cos(angle);
				positionsAttr.array[idx + 1] = y + Math.sin(time * speed * 15) * 0.02;
			}
			positionsAttr.needsUpdate = true;

			renderer.render(scene, camera);
			frameId = requestAnimationFrame(animate);
		};

		const handleResize = () => {
			const { clientWidth: w, clientHeight: h } = container;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};

		window.addEventListener('resize', handleResize);

		animate();

		return () => {
			cancelAnimationFrame(frameId);
			window.removeEventListener('resize', handleResize);
			renderer.dispose();
			coreGeometry.dispose();
			coreMaterial.dispose();
			wireGeometry.dispose();
			wireMaterial.dispose();
			particlesGeometry.dispose();
			particlesMaterial.dispose();
			container.removeChild(renderer.domElement);
		};
	});

	onDestroy(() => {
		cancelAnimationFrame(frameId);
	});
</script>

<div class="hero-scene" bind:this={container} aria-hidden="true"></div>

<style>
	.hero-scene {
		position: absolute;
		inset: 0;
		z-index: 0;
		opacity: 0.8;
		pointer-events: none;
		filter: drop-shadow(0 0 60px rgba(124, 92, 255, 0.35));
	}
</style>
