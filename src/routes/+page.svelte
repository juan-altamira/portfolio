<script lang="ts">
import { onMount } from 'svelte';
import { projects } from '$lib/data/projects';
import ProjectCard from '$lib/components/ProjectCard.svelte';
import SlideInPicture from '$lib/components/SlideInPicture.svelte';
import { reveal, magnetic, ripple } from '$lib';

	const stats = [
		{
			label: 'Primer recorrido',
			value: '3 días hábiles',
			description: 'En 3 dias ya tenés una versión navegable para mostrar y recibir feedback.'
		},
		{
			label: 'Clientes que vuelven',
			value: '96%',
			description: 'Trabajo directo, sin agencias ni procesos lentos en el medio.'
		},
		{
			label: 'Proyectos recientes',
			value: 'Ultimos 7 publicados',
			description: 'Últimos sitios y apps en producción.'
		}
	];

	const focusAreas = [
		{
			title: "Primero te escucho",
			description:
				'Comprendo tu propuesta, tu cliente ideal y qué necesita ver para confiar en vos.',
			points: [
				'Reunión inicial clara y sin tecnicismos',
				'Mensajes alineados a tu negocio',
				'Objetivos concretos definidos juntos'
			]
		},
		{
			title: 'Experiencias ágiles',
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
			points: ['Transiciones fluidas', 'Imágenes nítidas, sin cortes', 'Narrativa visual alineada a tu estilo']
		}
	];

	const process = [
		{
			step: '1. Charla y diagnóstico',
			copy: 'En 15 minutos definimos objetivos, alcance y fechas. Revisamos lo que ya tenés.',
			tip: 'Identificamos el objetivo clave y los números que validan el éxito.'
		},
		{
			step: '2. Propuesta navegable',
			copy: 'En 3 días hábiles te muestro una versión funcional para recorrer como lo haría tu cliente.',
			tip: 'Testear con usuarios reales antes de invertir en desarrollo pesado.'
		},
		{
			step: '3. Lanzamiento y seguimiento',
			copy: 'Publicamos juntos, medimos resultados y te dejo guías simples para que sigas ajustando.',
			tip: 'Implementamos métricas accionables y cadencia de mejoras cortas.'
		}
	];

	let haloX = 50;
	let haloY = 50;
	let rafId = 0;
	let isMobile = false;

	function handleHeroPointer(event: PointerEvent) {
		if (isMobile || rafId) return;
		
		rafId = requestAnimationFrame(() => {
			const target = event.currentTarget as HTMLElement;
			const rect = target.getBoundingClientRect();
			haloX = ((event.clientX - rect.left) / rect.width) * 100;
			haloY = ((event.clientY - rect.top) / rect.height) * 100;
			rafId = 0;
		});
	}

	let activeProjectSlug = projects[0]?.slug ?? '';

	function handleProjectVisible(event: CustomEvent<{ slug: string; visible: boolean }>) {
		if (event.detail.visible) {
			activeProjectSlug = event.detail.slug;
		}
	}

	let activeProcessIndex = 0;
	let processContainer: HTMLElement | null = null;
	let processProgress = process.length > 1 ? 0.05 : 1;

onMount(() => {
	if (typeof window !== 'undefined') {
		isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	}
	
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
		{ threshold: 0.5, rootMargin: '0px' }
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
	class="relative overflow-hidden bg-white/[0.02] pb-20 pt-16"
	on:pointermove={handleHeroPointer}
	style={`--halo-x:${haloX}%; --halo-y:${haloY}%;`}
>
	<div class="pointer-events-none absolute inset-0 bg-noise-overlay opacity-60 mix-blend-screen"></div>
	<div class="pointer-events-none absolute -inset-x-32 -bottom-[360px] h-[520px] rounded-full bg-gradient-to-t from-primary.glass via-transparent to-transparent blur-[120px]"></div>
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--halo-x)_var(--halo-y),rgba(139,92,246,0.18),transparent_46%)] transition-[background] duration-150"
	></div>

	<div class="relative z-10 mx-auto max-w-[960px] px-5 sm:px-6 lg:px-10">
		<div class="flex flex-col gap-10">
			<div class="space-y-6" style="--reveal-delay: 0.05s" use:reveal={{ direction: 'up' }}>
				<h1 class="tracking-in leading-[1.05]">
					Creo sitios y experiencias digitales que cautivan, cuentan tu historia y convierten visitas en clientes.
				</h1>
				<p class="hero-subheadline text-lg text-text-secondary">
					Soy Juan. Transformo tus ideas en una web cálida, rápida y lista para vender. Trabajo directo con vos, sin agencias ni vueltas, y te respondo en el día.
				</p>
			</div>

			<div class="mt-2 flex flex-wrap gap-4" style="--reveal-delay: 0.12s" use:reveal={{ direction: 'right' }}>
				<div class="cta-magnetic inline-flex" use:magnetic={{ strength: 0.45 }}>
					<a
						href="https://wa.me/+543425048209"
						target="_blank"
						rel="noopener noreferrer"
						class="hero-cta inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition duration-200 hover:-translate-y-0.5 hover:shadow-inner hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
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
	</div>
</section>

<section id="proyectos" class="relative space-y-8 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] py-16">
	<div class="relative z-10 flex flex-col gap-4 px-6 lg:px-10" style="--reveal-delay: 0.2s" use:reveal={{ direction: 'up' }}>
		<h2 class="text-4xl font-semibold leading-[1.1] tracking-tight text-white">Casos recientes</h2>
		<p class="max-w-3xl text-neutral-300">
			Soluciones llave en mano. Te acompaño desde la historia que queremos contar hasta cada detalle visual. Entrego listo para usar, con animaciones cuidadas y una presencia de marca memorable desde el primer scroll.
		</p>
	</div>

	<div class="projects-grid">
		{#each projects as project}
			<div class:col-span-2={project.highlight}>
				<ProjectCard 
					{project} 
					active={activeProjectSlug === project.slug} 
					on:visible={handleProjectVisible}
				/>
			</div>
		{/each}
	</div>

	<div class="mt-12 flex flex-wrap items-center justify-between gap-4 px-6 lg:px-10">
		<p class="text-sm text-text-muted">
			Listo para dar el siguiente paso. Hagamos que tu producto destaque con resultados medibles desde el primer día.
		</p>
		<div class="flex gap-3">
			<a
				href="https://wa.me/+543425048209"
				target="_blank"
				rel="noopener noreferrer"
				class="escribime-btn inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition duration-200 hover:-translate-y-0.5 hover:shadow-inner hover:shadow-primary/40"
				use:ripple={{ color: 'rgba(255,255,255,0.25)' }}
			>
				Escribime ahora
				<span aria-hidden="true">↗</span>
			</a>
		</div>
	</div>
</section>

<section id="foco" class="relative grid gap-8 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] py-16 lg:grid-cols-3">
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
	<div class="relative z-10 flex flex-col gap-3 px-6 lg:px-10" style="--reveal-delay: 0.22s" use:reveal={{ direction: 'up' }}>
		<h2 class="text-3xl font-semibold text-white sm:text-4xl">Asi trabajo con vos:</h2>
		<p class="max-w-3xl text-neutral-300">
			Cada paso es claro, con entregas visibles y decisiones simples.
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

<section class="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] py-12">
	<div class="relative z-10 px-6 lg:px-10">
		<div class="mx-auto max-w-4xl text-center" style="--reveal-delay: 0.24s" use:reveal={{ direction: 'up' }}>
			<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-xl">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
					<circle cx="12" cy="12" r="10"/>
					<path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
					<path d="M12 18V6"/>
					</svg>
				Pago con Cripto
			</div>
			<h2 class="text-3xl font-semibold text-white sm:text-4xl">20% de descuento</h2>
			<p class="mt-3 text-neutral-300">
			Pagando con cualquiera de estas criptomonedas obtenés un 20 % de descuento. Transferencias instantáneas, globales y sin intermediarios, con comisiones de apenas unos centavos.
			</p>
		</div>
	
		<div class="mt-8 flex flex-wrap items-center justify-center gap-4" style="--reveal-delay: 0.3s" use:reveal={{ direction: 'up' }}>
			<div class="crypto-badge group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/20">
				<img src="/crypto/usdt.svg" alt="USDT" class="h-8 w-8" />
				<span class="text-sm font-semibold text-white">USDT</span>
				</div>
			
			<div class="crypto-badge group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/20">
				<img src="/crypto/usdc.svg" alt="USDC" class="h-8 w-8" />
				<span class="text-sm font-semibold text-white">USDC</span>
			</div>
			
			<div class="crypto-badge group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/20">
				<img src="/crypto/dai.svg" alt="DAI" class="h-8 w-8" />
				<span class="text-sm font-semibold text-white">DAI</span>
			</div>
			
			<div class="crypto-badge group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/20">
				<img src="/crypto/musd.png" alt="MUSD" class="h-8 w-8 rounded-full" />
				<span class="text-sm font-semibold text-white">MUSD</span>
			</div>
			
			<div class="crypto-badge group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/20">
				<img src="/crypto/bch.svg" alt="BCH" class="h-8 w-8" />
				<span class="text-sm font-semibold text-white">BCH</span>
			</div>
			
			<div class="crypto-badge group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/20">
				<img src="/crypto/xmr.svg" alt="XMR" class="h-8 w-8" />
				<span class="text-sm font-semibold text-white">XMR</span>
			</div>
			
			<div class="crypto-badge group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/20">
				<img src="/crypto/pol.svg" alt="POL" class="h-8 w-8" />
				<span class="text-sm font-semibold text-white">POL</span>
			</div>
		</div>
		</div>
	</section>

<section
	id="contacto"
	class="cta-footer relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface/60 px-6 py-16 lg:px-12"
>
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(139,92,246,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(52,211,153,0.12),transparent_50%)] opacity-70"></div>
	<div class="cta-waves pointer-events-none absolute inset-0"></div>

	<div class="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)] lg:items-center">
		<div class="flex items-start gap-4" style="--reveal-delay: 0.24s" use:reveal={{ direction: 'up' }}>
			<div class="avatar-glow flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-semibold text-white shadow-glow-soft">
				JP
			</div>
			<div class="space-y-2">
				<p class="text-sm uppercase tracking-[0.28em] text-primary-soft">Juan Altamira</p>
				<h2 class="text-3xl font-semibold text-white sm:text-4xl">Diagnóstico sin costo en 15&nbsp;min</h2>
				<p class="text-sm text-text-muted">
					Definimos alcance, impacto esperado y próximos pasos concretos. Respondo en menos de 24 horas.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-5" style="--reveal-delay: 0.3s" use:reveal={{ direction: 'right' }}>

			<div class="grid gap-4 sm:grid-cols-3">
			<a 
			href="https://wa.me/+543425048209" 
			target="_blank" 
			rel="noopener noreferrer"
			class="contact-card group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/20"
			>
			<div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7 text-white">
			<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
			</svg>
			</div>
			<div class="text-center">
			<p class="text-sm font-semibold text-white">WhatsApp</p>
			<p class="mt-1 text-xs text-text-muted">Respuesta rápida</p>
			</div>
			</a>
			
			<a 
			href="mailto:juanpabloaltamira@protonmail.com"
			class="contact-card group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/20"
			>
			<div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7 text-white">
			<rect x="2" y="4" width="20" height="16" rx="2"/>
			<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
			</svg>
			</div>
			<div class="text-center">
			<p class="text-sm font-semibold text-white">Email</p>
			<p class="mt-1 text-xs text-text-muted">Contacto formal</p>
			</div>
			</a>
			
			<a 
			href="https://t.me/juanpablo35" 
			target="_blank" 
			rel="noopener noreferrer"
			class="contact-card group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-primary/20"
			>
			<div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7 text-white">
			<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
			</svg>
			</div>
			<div class="text-center">
			<p class="text-sm font-semibold text-white">Telegram</p>
			<p class="mt-1 text-xs text-text-muted">Chat directo</p>
			</div>
			</a>
			</div>
					</div>
	</div>
</section>
