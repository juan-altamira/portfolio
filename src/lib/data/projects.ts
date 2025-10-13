export interface Project {
	slug: string;
	title: string;
	description: string;
	url: string;
	image: string;
	tags: string[];
	role: string;
	highlight?: boolean;
}

export const projects: Project[] = [
	{
		slug: 'nutri-track',
		title: 'Nutri Track',
		description:
			'Plataforma central para nutricionistas: planes personalizados, seguimiento diario y recordatorios automatizados en un mismo lugar.',
		url: 'https://www.nutri-track.pro/',
		image: '/projects/nutri-track.svg',
		tags: ['Gestión de pacientes', 'Planes editables', 'Indicadores claros'],
		role: 'Diseño y desarrollo integral',
		highlight: true
	},
	{
		slug: 'restaurante-cabrera',
		title: 'Restaurante Cabrera',
		description:
			'Sitio envolvente con reservas online, menú siempre actualizado y mensajes de confirmación automáticos.',
		url: 'https://restaurante-cabrera.vercel.app/',
		image: '/projects/restaurante-cabrera.svg',
		tags: ['Reservas en línea', 'Storytelling visual', 'Menú autogestionable'],
		role: 'Diseño y desarrollo web'
	},
	{
		slug: 'calculadoras-drab',
		title: 'Calculadoras DRAB',
		description:
			'Colección de calculadoras fáciles de usar para asesores financieros, con resultados claros y descargables.',
		url: 'https://calculadoras-drab.vercel.app/',
		image: '/projects/calculadoras-drab.svg',
		tags: ['Herramientas interactivas', 'Resultados descargables', 'Lenguaje simple'],
		role: 'Diseño y desarrollo a medida'
	},
	{
		slug: 'estadisticas-defi',
		title: 'Estadísticas DeFi',
		description:
			'Panel visual que muestra el pulso de proyectos DeFi con alertas claras y gráficos fáciles de leer.',
		url: 'https://estadisticas-defi.vercel.app/',
		image: '/projects/estadisticas-defi.svg',
		tags: ['Datos en vivo', 'Alertas automáticas', 'Informe visual'],
		role: 'Diseño y desarrollo frontend'
	},
	{
		slug: 'app-de-entrenamiento',
		title: 'App de Entrenamiento',
		description:
			'Aplicación para entrenadores con planes personalizables, registros visuales y agenda de clases compartida.',
		url: 'https://app-de-entrenamiento.vercel.app/',
		image: '/projects/app-de-entrenamiento.svg',
		tags: ['Planes flexibles', 'Seguimiento visual', 'Agenda online'],
		role: 'Dirección creativa y desarrollo'
	},
	{
		slug: 'seminario-guadalupe',
		title: 'Seminario Guadalupe',
		description:
			'Portal educativo con agenda pública, inscripciones simples y transmisión de conferencias en vivo.',
		url: 'https://seminario-guadalupe.vercel.app/',
		image: '/projects/seminario-guadalupe.svg',
		tags: ['Agenda pública', 'Inscripciones online', 'Streaming integrado'],
		role: 'Diseño de experiencia y desarrollo'
	},
	{
		slug: 'dietetica-salvia',
		title: 'Dietética Salvia',
		description:
			'Tienda online para productos saludables con suscripciones, recetario actualizado y mailings automatizados.',
		url: 'https://dietetica-salvia.vercel.app/',
		image: '/projects/dietetica-salvia.svg',
		tags: ['Ventas online', 'Suscripciones', 'Recetas dinámicas'],
		role: 'Diseño y desarrollo ecommerce'
	}
];
