<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	export let intensity = 1;
	export let depth = 6.5;

	let container: HTMLDivElement | null = null;
	let raf = 0;
	let targetProgress = 0;
	let currentProgress = 0;

	onMount(() => {
		if (typeof window === 'undefined' || !container) return;

		const el = container;
		const scene = new THREE.Scene();
		scene.background = null;

		const width = el.clientWidth;
		const height = el.clientHeight;
		const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 80);
		camera.position.set(0, 0, depth);

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(width, height);
		el.appendChild(renderer.domElement);

		const galaxy = new THREE.Group();
		scene.add(galaxy);

		const clusters: THREE.Points[] = [];
		const rings: THREE.Mesh[] = [];

		const makeCluster = (color: string, radius: number, count: number, speed: number) => {
			const geometry = new THREE.BufferGeometry();
			const positions = new Float32Array(count * 3);

			for (let i = 0; i < count; i++) {
				const angle = Math.random() * Math.PI * 2;
				const spiral = radius * (0.58 + Math.random() * 0.6);
				const y = (Math.random() - 0.5) * radius * 0.8;
				positions[i * 3] = Math.cos(angle) * spiral;
				positions[i * 3 + 1] = y;
				positions[i * 3 + 2] = Math.sin(angle) * spiral;
			}

			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			const material = new THREE.PointsMaterial({
				color,
				size: 0.05 + 0.02 * intensity,
				transparent: true,
				opacity: 0.55 - (Math.random() * 0.1)
			});

			const mesh = new THREE.Points(geometry, material);
			mesh.userData = { speed };
			galaxy.add(mesh);
			clusters.push(mesh);
		};

		makeCluster('#7c5cff', 3.2, Math.floor(380 * intensity), 0.32);
		makeCluster('#58ffc5', 2.2, Math.floor(300 * intensity), 0.42);
		makeCluster('#ffffff', 4.1, Math.floor(260 * intensity), 0.25);

		for (let i = 0; i < 3; i++) {
			const torusGeometry = new THREE.TorusGeometry(2.4 + i * 0.6, 0.06 + i * 0.015, 16, 220);
			const torusMaterial = new THREE.MeshBasicMaterial({
				color: i % 2 === 0 ? '#58ffc5' : '#7c5cff',
				transparent: true,
				opacity: 0.22
			});

			const ring = new THREE.Mesh(torusGeometry, torusMaterial);
			ring.rotation.x = Math.PI / 2;
			ring.userData = { offset: i * 0.7, factor: 1.3 + i * 0.4 };
			galaxy.add(ring);
			rings.push(ring);
		}

		const light = new THREE.PointLight('#ffffff', 1.6, 30);
		scene.add(light);

		const updateScrollTarget = () => {
			const range = Math.max(document.body.scrollHeight - window.innerHeight, 1);
			targetProgress = window.scrollY / range;
		};

		window.addEventListener('scroll', updateScrollTarget, { passive: true });
		updateScrollTarget();

		const clock = new THREE.Clock();

		const animate = () => {
			const delta = clock.getDelta();
			const elapsed = clock.getElapsedTime();

			currentProgress += (targetProgress - currentProgress) * 0.08;

			const motionMultiplier = 1 + currentProgress * 1.8;

			clusters.forEach((cluster) => {
				const speed = cluster.userData.speed ?? 0.3;
				cluster.rotation.y += delta * speed * motionMultiplier;
				cluster.rotation.x += delta * speed * 0.4;
			});

			rings.forEach((ring, index) => {
				const material = ring.material as THREE.Material & { opacity: number };
				ring.rotation.z = elapsed * 0.2 + currentProgress * Math.PI * 3 * (ring.userData.factor ?? 1);
				material.opacity = 0.18 + Math.sin(elapsed * 0.7 + ring.userData.offset) * 0.06;
			});

			galaxy.rotation.y = currentProgress * Math.PI * 4;
			galaxy.rotation.x = Math.sin(currentProgress * Math.PI * 2) * 0.3;
			galaxy.position.y = (currentProgress - 0.5) * 2.4;

			light.position.x = Math.sin(elapsed * 0.6) * 5;
			light.position.y = Math.cos(elapsed * 0.4) * 3;
			light.position.z = 6 + Math.sin(elapsed * 0.3) * 1.5;

			camera.position.z = depth - currentProgress * 1.4;
			camera.position.x = Math.sin(currentProgress * Math.PI * 2) * 1.2;
			camera.lookAt(0, 0, 0);

			renderer.render(scene, camera);
			raf = requestAnimationFrame(animate);
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
			cancelAnimationFrame(raf);
			window.removeEventListener('scroll', updateScrollTarget);
			window.removeEventListener('resize', onResize);
			renderer.dispose();
			galaxy.traverse((obj) => {
				if (obj instanceof THREE.Points || obj instanceof THREE.Mesh) {
					(obj.geometry as THREE.BufferGeometry).dispose();
					(obj.material as THREE.Material).dispose();
				}
			});
			if (container?.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}
		};
	});
</script>

<div class="scroll-galaxy" bind:this={container} aria-hidden="true"></div>

<style>
	.scroll-galaxy {
		position: absolute;
		inset: 0;
		z-index: 0;
		opacity: 0.9;
		mix-blend-mode: screen;
		pointer-events: none;
	}
</style>
