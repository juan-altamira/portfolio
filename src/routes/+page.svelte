<script lang="ts">
	import { projects } from '$lib/data/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import SlideInPicture from '$lib/components/SlideInPicture.svelte';
	import HeroScene from '$lib/components/HeroScene.svelte';
	import SectionOrbits from '$lib/components/SectionOrbits.svelte';
	import { reveal } from '$lib/actions/reveal';

	const flagship = projects.find((project) => project.highlight)!;
	const otherProjects = projects.filter((project) => !project.highlight);

	const stats = [
		{
			label: 'Primer recorrido',
			value: '5 días hábiles',
			description: 'En una semana ya tenés una versión navegable para mostrar y recibir feedback.'
		},
		{
			label: 'Clientes que vuelven',
			value: '96%',
			description: 'Trabajo directo, sin agencias ni procesos lentos en el medio.'
		},
		{
			label: 'Proyectos cerrados',
			value: '45+',
			description: 'Sitios y aplicaciones hechos para vender más y responder mejor a tus clientes.'
		}
	];

	const focusAreas = [
		{
			title: 'Primero te escucho',
			description:
				'Comprendo tu propuesta, tu cliente ideal y qué necesita ver para confiar en vos.',
			points: [
				'Reunión inicial clara y sin tecnicismos',
				'Historia y mensajes alineados a tu negocio',
				'Objetivos concretos definidos juntos'
			]
		},
		{
			title: 'Construyo experiencias ágiles',
			description:
				'Cuidan la velocidad y el detalle para que cada visita se sienta profesional y confiable.',
			points: [
				'Carga veloz en cualquier dispositivo',
				'Formularios y reservas simples de usar',
				'Textos y llamados a la acción pensados para convertir'
			]
		},
		{
			title: 'Detalles que emocionan',
			description:
				'Animaciones suaves, fotos con presencia y un recorrido que muestra lo mejor de tu marca.',
			points: ['Transiciones fluidas que sorprenden', 'Imágenes siempre en foco y sin cortes', 'Narrativa visual alineada a tu estilo']
		}
	];

	const process = [
		{
			step: '1. Charla y diagnóstico',
			copy: 'Conversamos sobre tu negocio, revisamos lo que ya tenés y definimos prioridades reales.'
		},
		{
			step: '2. Propuesta navegable',
			copy: 'Te muestro una versión funcional para que camines la experiencia igual que tus clientes.'
		},
		{
			step: '3. Lanzamiento y acompañamiento',
			copy: 'Publicamos juntos, medimos resultados y te dejo guías simples para seguir ajustando.'
		}
	];

	const contactLinks = [
		{
			label: 'Email',
			value: 'juanpabloaltamira@protonmail.com',
			href: 'mailto:juanpabloaltamira@protonmail.com'
		},
		{
			label: 'Instagram',
			value: '@juan_pablo_altamira',
			href: 'https://www.instagram.com/juan_pablo_altamira/'
		}
	];
</script>

<svelte:head>
	<title>Juan Pablo Altamira — Portfolio</title>
	<meta
		name="description"
		content="Portfolio de Juan Pablo Altamira. Programador freelance que crea sitios y experiencias digitales rápidas, cálidas y pensadas para captar más clientes."
	/>
</svelte:head>

<section class="grid gap-10 pb-16 pt-8 lg:grid-cols-[minmax(0,1.2fr),minmax(0,0.8fr)] lg:items-center lg:gap-20">
	<div class="flex flex-col gap-8" style="--reveal-delay: 0.05s" use:reveal={{ direction: 'up' }}>
		<div class="space-y-5">
			<span class="inline-flex max-w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
				Trabajo uno a uno con marcas que quieren brillar online
			</span>
			<h1 class="max-w-3xl text-4xl font-semibold leading-[1.1] text-white text-balance sm:text-[2.9rem] lg:text-[3.4rem]">
				Creo sitios y experiencias digitales que cautivan, cuentan tu historia y convierten visitas en clientes.
			</h1>
			<p class="max-w-3xl text-base text-neutral-300 sm:text-lg">
				Soy Juan Pablo Altamira, programador freelance. Transformo tus ideas en una web cálida, rápida y lista para vender, trabajando directamente con vos y hablando en el mismo idioma.
			</p>
		</div>

			<div class="flex flex-wrap gap-4" style="--reveal-delay: 0.18s" use:reveal={{ direction: 'right' }}>
			<a
				href="mailto:juanpabloaltamira@protonmail.com"
				class="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/50"
			>
				Contame sobre tu proyecto
				<span aria-hidden="true">↗</span>
			</a>

			<a
				href="#proyectos"
				class="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:border-primary hover:text-primary"
			>
				Ver proyectos destacados
			</a>
		</div>

	<div class="grid gap-4 sm:grid-cols-3">
			{#each stats as stat, index}
				<div
					class="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
					style={`--reveal-delay: ${0.26 + index * 0.08}s`}
					use:reveal={{ direction: 'up' }}
				>
					<p class="text-xs uppercase tracking-wide text-neutral-400">{stat.label}</p>
					<p class="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
					<p class="mt-1 text-xs text-neutral-400">{stat.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="relative flex flex-col gap-6" style="--reveal-delay: 0.2s" use:reveal={{ direction: 'right' }}>
		<div class="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-2 shadow-[0_0_80px_rgba(124,92,255,0.35)]">
			<HeroScene />
			<div class="relative z-10 flex h-full flex-col justify-between rounded-[1.35rem] bg-black/30 p-6 backdrop-blur-xl">
				<div>
					<p class="text-xs uppercase tracking-[0.3em] text-primary-soft/80">Animación 3D interactiva</p>
					<h3 class="mt-3 text-2xl font-semibold text-white sm:text-3xl">Energía creativa en tiempo real</h3>
					<p class="mt-2 max-w-sm text-sm text-neutral-300">
						Estructuras dinámicas, partículas orbitando y luces que reaccionan para reflejar la forma en que diseño experiencias digitales vivas.
					</p>
				</div>
				<span class="mt-6 inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80">
					Three.js · WebGL · Motion
				</span>
			</div>
		</div>

		<a
			href={flagship.url}
			target="_blank"
			rel="noopener noreferrer"
			class="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
		>
			<SlideInPicture
				src={flagship.image}
				alt={`Visual del proyecto ${flagship.title}`}
				direction="right"
				aspectRatio="3/2"
			/>
			<div class="mt-6 space-y-2 rounded-3xl border border-white/10 bg-white/[0.05] p-5 text-sm text-neutral-300 shadow-lg shadow-black/40 transition duration-300 group-hover:border-primary/60 group-hover:bg-white/[0.08] group-hover:text-white">
				<p class="font-medium text-white">
					{flagship.title} — {flagship.description}
				</p>
				<ul class="flex flex-wrap gap-2 text-xs text-neutral-400 group-hover:text-neutral-200">
					{#each flagship.tags as tag}
						<li class="rounded-full bg-white/5 px-3 py-1 group-hover:bg-primary/20 group-hover:text-white">{tag}</li>
					{/each}
				</ul>
			</div>
		</a>
	</div>
</section>

<section id="proyectos" class="relative space-y-8 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] py-16">
	<SectionOrbits intensity={0.35} scale={1.1} />
	<div class="relative flex flex-col gap-4 px-6 lg:px-10" style="--reveal-delay: 0.2s" use:reveal={{ direction: 'up' }}>
		<h2 class="text-3xl font-semibold text-white sm:text-4xl">Casos recientes</h2>
		<p class="max-w-3xl text-neutral-300">
			Construyo soluciones llave en mano: desde la historia que queremos contar hasta cada detalle visual.
			Cada proyecto se entrega listo para usar, con animaciones cuidadas y una presencia de marca memorable desde el primer scroll.
		</p>
	</div>

	<div class="relative grid gap-10 px-6 lg:px-10">
		{#each otherProjects as project, index}
			<div style={`--reveal-delay: ${0.24 + index * 0.12}s`}>
				<ProjectCard {project} />
			</div>
		{/each}
	</div>
</section>

<section class="relative grid gap-8 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] py-16 lg:grid-cols-3">
	<SectionOrbits intensity={0.28} scale={0.9} />
	{#each focusAreas as area, index}
		<article
			class="relative z-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
			style={`--reveal-delay: ${0.24 + index * 0.08}s`}
			use:reveal={{ direction: 'up' }}
		>
			<h3 class="text-2xl font-semibold text-white">{area.title}</h3>
			<p class="text-sm text-neutral-300">{area.description}</p>
			<ul class="mt-2 space-y-2 text-sm text-neutral-300">
				{#each area.points as point}
					<li class="flex items-start gap-2">
						<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-accent"></span>
						{point}
					</li>
				{/each}
			</ul>
		</article>
	{/each}
</section>

<section class="relative space-y-10 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] py-16">
	<SectionOrbits intensity={0.3} scale={1} />
	<div class="relative flex flex-col gap-3 px-6 lg:px-10" style="--reveal-delay: 0.22s" use:reveal={{ direction: 'up' }}>
		<h2 class="text-3xl font-semibold text-white sm:text-4xl">Proceso sin fricción</h2>
		<p class="max-w-3xl text-neutral-300">
			Cada fase se construye con herramientas reales desde el día uno. Documentación viva, handoff inexistente y equipos alineados.
		</p>
	</div>

	<div class="relative grid gap-6 px-6 lg:grid-cols-3 lg:px-10">
		{#each process as item, index}
			<div
				class="relative z-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-black/30 p-6 backdrop-blur-xl"
				style={`--reveal-delay: ${0.26 + index * 0.08}s`}
				use:reveal={{ direction: 'up' }}
			>
				<h3 class="text-xl font-semibold text-white">{item.step}</h3>
				<p class="mt-3 text-sm text-neutral-300">{item.copy}</p>
			</div>
		{/each}
	</div>
</section>

<section class="relative overflow-hidden rounded-[2.5rem] border border-primary/40 bg-gradient-to-br from-primary/25 via-primary/15 to-transparent p-10">
	<div class="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/30 blur-3xl animate-glow-pulse"></div>
	<div class="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-glow-pulse" style="animation-delay: 0.8s"></div>
	<SectionOrbits intensity={0.22} scale={0.85} />

	<div class="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
		<div class="max-w-2xl space-y-4" style="--reveal-delay: 0.24s" use:reveal={{ direction: 'up' }}>
			<h2 class="text-3xl font-semibold text-white sm:text-4xl">
				Listo para darle vida a tu próximo proyecto.
			</h2>
			<p class="text-sm text-neutral-200 sm:text-base">
				Contame qué querés lograr, cuál es tu fecha ideal y qué te gustaría que tus clientes sientan al entrar. En menos de 24 horas te respondo con una propuesta clara, tiempos y próximos pasos.
			</p>
		</div>

		<ul class="relative z-10 flex flex-col gap-3 text-sm text-neutral-200" style="--reveal-delay: 0.3s" use:reveal={{ direction: 'right' }}>
			{#each contactLinks as item}
				<li class="flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 backdrop-blur-xl">
					<span class="text-neutral-400">{item.label}</span>
					{#if item.href.startsWith('http')}
						<a
							class="rounded-full px-3 py-1 text-white transition hover:bg-white hover:text-black"
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
						>
							{item.value}
						</a>
					{:else}
						<a
							class="rounded-full px-3 py-1 text-white transition hover:bg-white hover:text-black"
							href={item.href}
						>
							{item.value}
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>
