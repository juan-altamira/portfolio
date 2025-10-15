<script lang="ts">
import { onMount } from 'svelte';
import { projects } from '$lib/data/projects';
import ProjectCard from '$lib/components/ProjectCard.svelte';
import SlideInPicture from '$lib/components/SlideInPicture.svelte';
import ScrollGalaxy from '$lib/components/ScrollGalaxy.svelte';
import { reveal, magnetic, ripple } from '$lib';

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
			copy: 'Conversamos sobre tu negocio, revisamos lo que ya tenés y definimos prioridades reales.',
			tip: 'Identificamos el objetivo clave y los números que validan el éxito.'
		},
		{
			step: '2. Propuesta navegable',
			copy: 'Te muestro una versión funcional para que camines la experiencia igual que tus clientes.',
			tip: 'Testear con usuarios reales antes de invertir en desarrollo pesado.'
		},
		{
			step: '3. Lanzamiento y acompañamiento',
			copy: 'Publicamos juntos, medimos resultados y te dejo guías simples para seguir ajustando.',
			tip: 'Implementamos métricas accionables y cadencia de mejoras cortas.'
		}
	];

let haloX = 50;
let haloY = 50;

const handleHeroPointer = (event: PointerEvent) => {
	const target = event.currentTarget as HTMLElement;
	const rect = target.getBoundingClientRect();
	haloX = ((event.clientX - rect.left) / rect.width) * 100;
	haloY = ((event.clientY - rect.top) / rect.height) * 100;
};

let activeProjectSlug = flagship?.slug ?? '';

const handleProjectVisible = (event: CustomEvent<{ slug: string; visible: boolean }>) => {
	if (event.detail.visible) {
		activeProjectSlug = event.detail.slug;
	}
};

let activeProcessIndex = 0;
let processContainer: HTMLElement | null = null;
let processProgress = process.length > 1 ? 0.05 : 1;

onMount(() => {
	if (typeof window === 'undefined') return;
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const index = Number((entry.target as HTMLElement).dataset.index ?? '0');
					activeProcessIndex = index;
					processProgress = process.length > 1 ? index / (process.length - 1) : 1;
				}
			});
		},
		{ threshold: 0.6 }
	);

	const register = () => {
		const elements = processContainer?.querySelectorAll<HTMLElement>('.process-card');
		elements?.forEach((el, index) => {
			el.dataset.index = index.toString();
			observer.observe(el);
		});
	};

	requestAnimationFrame(register);

	return () => observer.disconnect();
});
</script>

<svelte:head>
	<title>Juan Pablo Altamira — Portfolio</title>
	<meta
		name="description"
		content="Portfolio de Juan Pablo Altamira. Programador freelance que crea sitios y experiencias digitales rápidas, cálidas y pensadas para captar más clientes."
	/>
</svelte:head>

<section
	id="inicio"
	class="relative overflow-hidden bg-white/[0.02] pb-24 pt-18"
	on:pointermove={handleHeroPointer}
	style={`--halo-x:${haloX}%; --halo-y:${haloY}%;`}
>
	<div class="pointer-events-none absolute inset-0 bg-noise-overlay opacity-60 mix-blend-screen"></div>
	<div class="pointer-events-none absolute -inset-x-40 -bottom-[420px] h-[560px] rounded-full bg-gradient-to-t from-primary.glass via-transparent to-transparent blur-[140px]"></div>
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--halo-x)_var(--halo-y),rgba(139,92,246,0.18),transparent_46%)] transition-[background] duration-150"
	></div>

	<div class="relative z-10 mx-auto grid max-w-[1200px] grid-cols-12 gap-y-16 gap-x-8 px-6 lg:px-10">
		<div class="col-span-12 flex flex-col gap-10 lg:col-span-7">
			<div class="space-y-6" style="--reveal-delay: 0.05s" use:reveal={{ direction: 'up' }}>
				<span class="overline inline-flex max-w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 tracking-[0.18em] text-primary-soft">
					Trabajo uno a uno con marcas que quieren brillar online
				</span>
				<h1 class="tracking-in leading-[1.05]">
					Creo sitios y experiencias digitales que cautivan, cuentan tu historia y convierten visitas en clientes.
				</h1>
				<p class="hero-subheadline text-lg text-text-secondary">
					Soy Juan Pablo Altamira, programador freelance. Transformo tus ideas en una web cálida, rápida y lista para vender,
					trabajando directamente con vos y hablando en el mismo idioma.
				</p>
			</div>

			<div class="mt-2 flex flex-wrap gap-4" style="--reveal-delay: 0.12s" use:reveal={{ direction: 'right' }}>
				<div class="cta-magnetic inline-flex" use:magnetic={{ strength: 0.45 }}>
					<a
						href="mailto:juanpabloaltamira@protonmail.com"
						class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition duration-200 hover:-translate-y-0.5 hover:shadow-inner hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
						use:ripple={{ color: 'rgba(255,255,255,0.25)' }}
					>
						Contame sobre tu proyecto
						<span aria-hidden="true" class="text-base">↗</span>
					</a>
				</div>

				<a
					href="#proyectos"
					class="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
					use:ripple={{ color: 'rgba(139,92,246,0.25)' }}
				>
					Ver proyectos destacados
				</a>
			</div>

			<div class="grid gap-4 sm:grid-cols-3" style="--reveal-delay: 0.2s" use:reveal={{ direction: 'up' }}>
				{#each stats as stat, index}
					<div class="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition duration-200 hover:border-primary hover:bg-white/[0.06]">
						<p class="text-xs uppercase tracking-[0.2em] text-text-muted">{stat.label}</p>
						<p class="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
						<p class="mt-1 text-xs text-text-muted">{stat.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="relative col-span-12 flex justify-center lg:col-span-5" style="--reveal-delay: 0.16s" use:reveal={{ direction: 'right' }}>
			<div class="hero-card relative w-full max-w-[420px] overflow-hidden rounded-[26px] border border-white/10 bg-surface-soft/70 p-4 backdrop-blur-2xl">
				<div class="hero-card-badge">Scroll + Mouse</div>
				<div class="hero-card-shimmer" aria-hidden="true"></div>
				<span class="hero-particle hero-particle--a" aria-hidden="true"></span>
				<span class="hero-particle hero-particle--b" aria-hidden="true"></span>
				<span class="hero-particle hero-particle--c" aria-hidden="true"></span>
				<ScrollGalaxy intensity={0.24} depth={6} mode="structure" />
				<div class="relative z-10 flex h-full flex-col justify-between rounded-[1.6rem] bg-black/60 p-6 backdrop-blur-2xl">
					<div class="space-y-4">
						<p class="text-xs uppercase tracking-[0.3em] text-primary-soft">Experiencias vivas</p>
						<h3 class="text-2xl font-semibold text-white">Tarjeta 3D reactiva</h3>
						<p class="text-sm text-text-muted">
							Una constelación dinámica que acompaña tu marca y responde a cada desplazamiento sin distraer del mensaje.
						</p>
					</div>
					<div class="flex items-center justify-between text-xs text-text-muted">
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-primary/70"></span>
							<span>Partículas activas</span>
						</div>
						<span class="text-primary-soft font-semibold">Interactivo</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="proyectos" class="relative space-y-8 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] py-16">
	<ScrollGalaxy intensity={0.35} depth={7.4} mode="structure" />
	<div class="relative z-10 flex flex-col gap-4 px-6 lg:px-10" style="--reveal-delay: 0.2s" use:reveal={{ direction: 'up' }}>
		<h2 class="text-4xl font-semibold leading-[1.1] tracking-tight text-white">Casos recientes</h2>
		<p class="max-w-3xl text-neutral-300">
			Construyo soluciones llave en mano: desde la historia que queremos contar hasta cada detalle visual.
			Cada proyecto se entrega listo para usar, con animaciones cuidadas y una presencia de marca memorable desde el primer scroll.
		</p>
	</div>

	<div class="relative z-10 grid gap-10 px-6 lg:grid-cols-2 lg:px-10">
		<div class="lg:col-span-2">
			<ProjectCard project={flagship} active={activeProjectSlug === flagship.slug} on:visible={handleProjectVisible} />
		</div>

		{#each otherProjects as project, index}
			<div>
				<ProjectCard {project} active={activeProjectSlug === project.slug} on:visible={handleProjectVisible} />
			</div>
		{/each}
	</div>

	<div class="mt-12 flex flex-wrap items-center justify-between gap-4 px-6 lg:px-10">
		<p class="text-sm text-text-muted">
			Listo para dar el siguiente paso. Hagamos que tu producto destaque con resultados medibles desde el día uno.
		</p>
		<div class="flex gap-3">
			<a
				href="mailto:juanpabloaltamira@protonmail.com"
				class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition duration-200 hover:-translate-y-0.5 hover:shadow-inner hover:shadow-primary/40"
				use:ripple={{ color: 'rgba(255,255,255,0.25)' }}
			>
				Escribime ahora
				<span aria-hidden="true">↗</span>
			</a>
			<a
				href="#contacto"
				class="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:border-primary hover:text-primary"
				use:ripple={{ color: 'rgba(139,92,246,0.2)' }}
			>
				Agendar 15 min
			</a>
		</div>
	</div>
</section>

<section id="foco" class="relative grid gap-8 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] py-16 lg:grid-cols-3">
	<ScrollGalaxy intensity={0.24} depth={7.2} mode="structure" />
	{#each focusAreas as area, index}
		<article
			class="focus-card group relative z-10 flex min-h-[240px] flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-primary/60 lg:p-8"
			style={`--reveal-delay: ${0.24 + index * 0.08}s`}
			use:reveal={{ direction: 'up' }}
		>
			<div class="focus-spotlight"></div>
			<h3 class="text-2xl font-semibold text-white transition duration-300 group-hover:text-primary">{area.title}</h3>
			<p class="text-sm text-text-secondary">{area.description}</p>
			<ul class="mt-2 space-y-2 text-sm text-text-secondary">
				{#each area.points as point}
					<li class="focus-point flex items-start gap-3">
						<span class="focus-icon inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-semibold text-accent transition duration-300">
							✓
						</span>
						<span>{point}</span>
					</li>
				{/each}
			</ul>
		</article>
	{/each}
</section>

<section id="proceso" class="relative space-y-10 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] py-16">
	<ScrollGalaxy intensity={0.26} depth={7.5} mode="structure" />
	<div class="relative z-10 flex flex-col gap-3 px-6 lg:px-10" style="--reveal-delay: 0.22s" use:reveal={{ direction: 'up' }}>
		<h2 class="text-3xl font-semibold text-white sm:text-4xl">Proceso sin fricción</h2>
		<p class="max-w-3xl text-neutral-300">
			Cada fase se construye con herramientas reales desde el día uno. Documentación viva, handoff inexistente y equipos alineados.
		</p>
	</div>

	<div
		class="process-grid relative z-10 grid gap-6 px-6 lg:grid-cols-3 lg:px-10"
		bind:this={processContainer}
		style={`--process-progress:${processProgress}`}
	>
		{#each process as item, index}
			<div
				class="group process-card relative z-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-black/30 p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:scale-[1.03] hover:border-primary/70 hover:shadow-[0_30px_90px_rgba(124,92,255,0.22)] lg:p-8 lg:before:absolute lg:before:top-1/2 lg:before:right-[-36px] lg:before:h-px lg:before:w-16 lg:before:-translate-y-1/2 lg:before:bg-gradient-to-r lg:before:from-white/15 lg:before:to-transparent lg:last:before:hidden"
				class:process-active={activeProcessIndex === index}
				style={`--reveal-delay: ${0.26 + index * 0.08}s`}
				use:reveal={{ direction: 'up' }}
			>
				<div class="process-marker" aria-hidden="true"></div>
				<div class="process-tooltip">
					{item.tip}
				</div>
				<h3 class="text-xl font-semibold text-white transition duration-500 group-hover:text-primary">{item.step}</h3>
				<p class="mt-3 text-sm text-neutral-300 transition duration-500 group-hover:text-neutral-200">{item.copy}</p>
			</div>
		{/each}
	</div>
</section>

<section
	id="contacto"
	class="cta-footer relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface/60 px-6 py-16 lg:px-12"
>
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(139,92,246,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(52,211,153,0.12),transparent_50%)] opacity-70"></div>
	<div class="cta-waves pointer-events-none absolute inset-0"></div>
	<ScrollGalaxy intensity={0.18} depth={6.5} mode="structure" />

	<div class="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)] lg:items-center">
		<div class="flex items-start gap-4" style="--reveal-delay: 0.24s" use:reveal={{ direction: 'up' }}>
			<div class="avatar-glow flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-semibold text-white shadow-glow-soft">
				JP
			</div>
			<div class="space-y-2">
				<p class="text-sm uppercase tracking-[0.28em] text-primary-soft">Juan Pablo Altamira</p>
				<h2 class="text-3xl font-semibold text-white sm:text-4xl">Diagnóstico sin costo en 15&nbsp;min</h2>
				<p class="text-sm text-text-muted">
					Definimos alcance, impacto esperado y próximos pasos concretos. Respondo en menos de 24 horas hábiles.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-5" style="--reveal-delay: 0.3s" use:reveal={{ direction: 'right' }}>
			<form class="contact-form flex flex-col gap-3 sm:flex-row" on:submit|preventDefault>
				<label class="sr-only" for="contact-email">Email</label>
				<div class="relative flex-1">
					<input
						type="email"
						id="contact-email"
						placeholder="tuemail@negocio.com"
						required
						class="contact-input"
					/>
					<span class="input-glow" aria-hidden="true"></span>
				</div>
				<button type="submit" class="contact-button" use:ripple={{ color: 'rgba(12,12,14,0.35)', duration: 500 }}>
					Agendar 15 min
				</button>
			</form>

			<div class="flex flex-wrap items-center gap-4 text-sm text-text-muted">
				<a href="mailto:juanpabloaltamira@protonmail.com" class="inline-flex items-center gap-2 hover:text-primary-soft">
					<span class="text-primary-soft">✉︎</span>
					juanpabloaltamira@protonmail.com
				</a>
				<a
					href="https://www.instagram.com/juan_pablo_altamira/"
					target="_blank"
					rel="noopener noreferrer"
					class="insta-link inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-base text-text-muted transition"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
						<path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.4.5.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.4.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2Zm0 1.6c-3.1 0-3.5 0-4.8.1-1 .1-1.5.2-1.8.4-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.3-.3.8-.4 1.8-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1 .2 1.5.4 1.8.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.1.8.3 1.8.4 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1-.1 1.5-.2 1.8-.4.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.3.3-.8.4-1.8.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1-.2-1.5-.4-1.8-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.3-.1-.8-.3-1.8-.4-1.3-.1-1.7-.1-4.8-.1Zm0 3c2.4 0 4.4 1.9 4.4 4.4S14.4 15.6 12 15.6 7.6 13.7 7.6 11.2 9.6 6.8 12 6.8Zm0 1.6a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5-2.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
					</svg>
					<span class="sr-only">Instagram</span>
				</a>
			</div>
		</div>
	</div>
</section>
