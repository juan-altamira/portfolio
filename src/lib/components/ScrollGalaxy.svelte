<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	export let intensity = 1;
	export let depth = 6.5;
	export let mode: 'structure' | 'particles' = 'structure';

	let container: HTMLDivElement | null = null;
	let raf = 0;
	let targetProgress = 0;
	let currentProgress = 0;

	onMount(() => {
		if (typeof window === 'undefined' || !container) return;

		const el = container;
		const width = el.clientWidth;
		const height = el.clientHeight;

		const scene = new THREE.Scene();
		scene.background = null;

		const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 60);
		camera.position.set(0, 0, depth);

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(width, height);
		el.appendChild(renderer.domElement);

		const galaxy = new THREE.Group();
		scene.add(galaxy);

		const mainColor = new THREE.Color('#7c5cff');
		const accentColor = new THREE.Color('#58ffc5');
		const opacityScale = 0.55;

		const loops: THREE.Object3D[] = [];
		const nodes: THREE.Mesh[] = [];
		const particleSystems: THREE.Points[] = [];

		const addLoop = (radius: number, thickness: number, opacity: number, offsetY = 0) => {
			const geo = new THREE.TorusGeometry(radius, thickness, 16, 260);
			const mat = new THREE.MeshBasicMaterial({
				color: mainColor.clone().lerp(accentColor, Math.random() * 0.6),
				transparent: true,
				opacity: opacity * opacityScale
			});
			const mesh = new THREE.Mesh(geo, mat);
			mesh.rotation.x = Math.PI / 2;
			mesh.position.y = offsetY;
			galaxy.add(mesh);
			loops.push(mesh);
		};

		const addNode = (position: THREE.Vector3) => {
			const geo = new THREE.SphereGeometry(0.12 + 0.04 * intensity, 24, 24);
			const mat = new THREE.MeshStandardMaterial({
				color: accentColor.clone().lerp(mainColor, Math.random()),
				transparent: true,
				opacity: 0.75,
				metalness: 0.35,
				roughness: 0.4,
				emissive: '#1a123b',
				emissiveIntensity: 0.45
			});
			const mesh = new THREE.Mesh(geo, mat);
			mesh.position.copy(position);
			galaxy.add(mesh);
			nodes.push(mesh);
		};

		const addParticleRibbon = (color: string, radius: number, count: number) => {
			const geometry = new THREE.BufferGeometry();
			const data = new Float32Array(count * 3);
			for (let i = 0; i < count; i++) {
				const angle = (i / count) * Math.PI * 2;
				const x = Math.cos(angle) * radius;
				const y = Math.sin(angle * 0.6) * radius * 0.25;
				const z = Math.sin(angle) * radius * 0.6;
				data[i * 3] = x;
				data[i * 3 + 1] = y;
				data[i * 3 + 2] = z;
			}
			geometry.setAttribute('position', new THREE.BufferAttribute(data, 3));
			const material = new THREE.PointsMaterial({
				color,
				size: 0.05,
				transparent: true,
				opacity: 0.3
			});
			const points = new THREE.Points(geometry, material);
			points.userData = { basePositions: data };
			galaxy.add(points);
			particleSystems.push(points);
		};

		// Base structural loops
		addLoop(2.5, 0.06, 0.4 * intensity);
		addLoop(2.95, 0.05, 0.32 * intensity, 0.15);
		addLoop(3.35, 0.045, 0.25 * intensity, -0.12);

		const nodePositions = [
			new THREE.Vector3(0, 0.9, 0),
			new THREE.Vector3(1.5, -0.6, 1.1),
			new THREE.Vector3(-1.6, -0.4, -1.2),
			new THREE.Vector3(0.5, 0.4, -1.7),
			new THREE.Vector3(-0.4, 0.5, 1.6)
		];
		nodePositions.forEach(addNode);

		if (mode === 'particles') {
			addParticleRibbon('#7c5cff', 2.4, Math.floor(220 * intensity));
			addParticleRibbon('#58ffc5', 3.2, Math.floor(260 * intensity));
		}

		const gridGeometry = new THREE.PlaneGeometry(8, 8, 40, 40);
		const gridMaterial = new THREE.MeshBasicMaterial({
			color: '#ffffff',
			transparent: true,
			opacity: 0.025,
			wireframe: true
		});
		const grid = new THREE.Mesh(gridGeometry, gridMaterial);
		grid.rotation.x = Math.PI / 2;
		grid.position.y = -1.2;
		galaxy.add(grid);

		const light = new THREE.PointLight('#ffffff', 1.1, 25);
		scene.add(light);

		const updateScrollTarget = () => {
			const range = Math.max(document.body.scrollHeight - window.innerHeight, 1);
			targetProgress = window.scrollY / range;
		};

		window.addEventListener('scroll', updateScrollTarget, { passive: true });
		updateScrollTarget();

		const clock = new THREE.Clock();

		const animate = () => {
			const elapsed = clock.getElapsedTime();
			const delta = clock.getDelta();

			currentProgress += (targetProgress - currentProgress) * 0.08;

			const smoothRotation = mode === 'structure' ? 2.4 : 4;
			galaxy.rotation.y = currentProgress * Math.PI * smoothRotation;
			galaxy.rotation.x = Math.sin(currentProgress * Math.PI * 2) * (mode === 'structure' ? 0.18 : 0.3);
			galaxy.position.y = (currentProgress - 0.5) * (mode === 'structure' ? 1.4 : 2.2);

			loops.forEach((loop, index) => {
				loop.rotation.z = elapsed * 0.15 + index * 0.4;
				loop.scale.setScalar(1 + Math.sin(elapsed * 0.6 + index) * 0.03 * intensity);
			});

			nodes.forEach((node, index) => {
				node.position.y += Math.sin(elapsed * 0.8 + index) * 0.004;
				node.rotation.y += 0.01;
			});

			if (mode === 'particles') {
				particleSystems.forEach((system) => {
					system.rotation.y += delta * 0.6;
					const positions = system.geometry.getAttribute('position') as THREE.BufferAttribute;
					for (let i = 0; i < positions.count; i++) {
						const base = system.userData.basePositions as Float32Array;
						const z = base[i * 3 + 2];
						const wobble = Math.sin(elapsed * 1.2 + i * 0.1) * 0.12;
						positions.setZ(i, z + wobble);
					}
					positions.needsUpdate = true;
				});
			}

			grid.rotation.z = elapsed * 0.05;
			grid.material.opacity = 0.025 + Math.sin(elapsed * 0.4) * 0.008;

			light.position.x = Math.sin(elapsed * 0.6) * 4;
			light.position.y = Math.cos(elapsed * 0.5) * 3;
			light.position.z = 5.5 + Math.sin(elapsed * 0.3) * 1.2;

			camera.position.z = depth - currentProgress * 1.1;
			camera.position.x = Math.sin(currentProgress * Math.PI * 2) * 0.9;
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
				if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Points) {
					(obj.geometry as THREE.BufferGeometry).dispose();
					const mat = obj.material;
					if (Array.isArray(mat)) {
						mat.forEach((m) => m.dispose());
					} else {
						mat.dispose();
					}
				}
			});
			if (container?.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}
		};
	});
</script>

<div class="scroll-galaxy" bind:this={container} aria-hidden="true"></div>
