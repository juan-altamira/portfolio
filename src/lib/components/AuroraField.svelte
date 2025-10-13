<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	export let colorA = '#7c5cff';
	export let colorB = '#58ffc5';
	export let ribbons = 4;

	let container: HTMLDivElement | null = null;
	let raf = 0;

	onMount(() => {
		if (typeof window === 'undefined' || !container) return;

		const el = container;
		const width = el.clientWidth;
		const height = el.clientHeight;

		const scene = new THREE.Scene();
		scene.background = null;

		const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 30);
		camera.position.set(0, 0, 8);

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(width, height);
		el.appendChild(renderer.domElement);

		const glowMaterial = new THREE.MeshBasicMaterial({
			color: colorA,
			transparent: true,
			opacity: 0.22,
			side: THREE.DoubleSide
		});

		const ribbonsGroup = new THREE.Group();
		scene.add(ribbonsGroup);

		const ribbonMeshes: THREE.Mesh[] = [];
		const speedFactors: number[] = [];

		for (let i = 0; i < ribbons; i++) {
			const geometry = new THREE.PlaneGeometry(6, 0.45, 120, 1);
			const mesh = new THREE.Mesh(geometry, glowMaterial.clone());
			mesh.material.opacity = 0.25 + Math.random() * 0.1;
			mesh.rotation.y = Math.random() * Math.PI;
			mesh.position.y = (i - ribbons / 2) * 0.6;
			mesh.position.x = (Math.random() - 0.5) * 1.4;
			mesh.material.color = new THREE.Color(colorA).lerp(new THREE.Color(colorB), Math.random());
			ribbonsGroup.add(mesh);
			ribbonMeshes.push(mesh);
			speedFactors.push(0.4 + Math.random() * 0.6);
		}

		const sparksGeometry = new THREE.BufferGeometry();
		const sparkCount = 260;
		const sparkPositions = new Float32Array(sparkCount * 3);
		const sparkSpeeds = new Float32Array(sparkCount);
		for (let i = 0; i < sparkCount; i++) {
			sparkPositions[i * 3] = (Math.random() - 0.5) * 6;
			sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
			sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
			sparkSpeeds[i] = 0.002 + Math.random() * 0.004;
		}
		sparksGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
		const sparksMaterial = new THREE.PointsMaterial({
			color: colorB,
			size: 0.06,
			transparent: true,
			opacity: 0.7
		});
		const sparks = new THREE.Points(sparksGeometry, sparksMaterial);
		scene.add(sparks);

		const light = new THREE.PointLight(colorB, 1.2, 12);
		light.position.set(2, 3, 4);
		scene.add(light);

		const clock = new THREE.Clock();
		const animate = () => {
			const elapsed = clock.getElapsedTime();

			ribbonsGroup.rotation.z = Math.sin(elapsed * 0.08) * 0.08;
			ribbonsGroup.rotation.x = Math.sin(elapsed * 0.05) * 0.05;

			ribbonMeshes.forEach((mesh, idx) => {
				const pos = mesh.geometry.attributes.position as THREE.BufferAttribute;
				for (let i = 0; i < pos.count; i++) {
					const x = pos.getX(i);
					const wave = Math.sin(x * 1.2 + elapsed * speedFactors[idx]) * 0.6;
					pos.setZ(i, wave);
				}
				pos.needsUpdate = true;
			});

			const sparkAttr = sparksGeometry.getAttribute('position') as THREE.BufferAttribute;
			for (let i = 0; i < sparkCount; i++) {
				const y = sparkAttr.getY(i) + sparkSpeeds[i];
				sparkAttr.setY(i, y > 1.8 ? -1.8 : y);
			}
			sparkAttr.needsUpdate = true;

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
			window.removeEventListener('resize', onResize);
			renderer.dispose();
			ribbonMeshes.forEach((mesh) => mesh.geometry.dispose());
			ribbonMeshes.forEach((mesh) => (mesh.material as THREE.Material).dispose());
			sparksGeometry.dispose();
			sparksMaterial.dispose();
			if (container?.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}
		};
	});
</script>

<div class="aurora-field" bind:this={container} aria-hidden="true"></div>

<style>
	.aurora-field {
		position: absolute;
		inset: 0;
		z-index: 0;
		opacity: 0.8;
		pointer-events: none;
		mix-blend-mode: screen;
	}
</style>
