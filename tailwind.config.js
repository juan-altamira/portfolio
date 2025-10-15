/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1.5rem',
				xl: '2rem'
			},
			screens: {
				'2xl': '1200px'
			}
		},
		extend: {
			fontFamily: {
				display: ['"Geist Variable"', '"Geist Sans"', 'system-ui', 'sans-serif'],
				sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif']
			},
			colors: {
				canvas: {
					DEFAULT: '#0b0c10',
					soft: '#13141d',
					fade: '#1c1d2a'
				},
				surface: {
					DEFAULT: '#13131f',
					soft: '#1e1f2f',
					elevated: '#222336'
				},
				primary: {
					DEFAULT: '#8b5cf6',
					soft: '#6d28d9',
					muted: '#c4b5fd',
					glass: 'rgba(139, 92, 246, 0.12)'
				},
				accent: {
					DEFAULT: '#34d399',
					soft: '#10b981'
				},
				text: {
					primary: '#f9fafb',
					secondary: 'rgba(229, 231, 235, 0.72)',
					muted: 'rgba(148, 163, 184, 0.75)'
				}
			},
			boxShadow: {
				glow: '0 0 60px rgba(139, 92, 246, 0.45)',
				'glow-soft': '0 20px 80px rgba(109, 40, 217, 0.25)'
			},
			backgroundImage: {
				'grid-fade':
					'radial-gradient(circle at 1px 1px, rgba(88, 255, 197, 0.2) 1px, transparent 0)',
				'noise-overlay':
					'radial-gradient(circle at 20% 20%, rgba(109, 40, 217, 0.08), transparent 55%), radial-gradient(circle at 80% 10%, rgba(52, 211, 153, 0.06), transparent 50%)'
			},
			keyframes: {
				'fade-up': {
					'0%': { opacity: '0', transform: 'translate3d(0, 40px, 0) scale3d(0.98, 0.98, 1)' },
					'60%': { opacity: '1', transform: 'translate3d(0, -6px, 0) scale3d(1.01, 1.01, 1)' },
					'100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)' }
				},
				'fade-right': {
					'0%': { opacity: '0', transform: 'translate3d(-60px, 0, 0)' },
					'100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
				},
				'glow-pulse': {
					'0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
					'50%': { opacity: '0.85', transform: 'scale(1.06)' }
				}
			},
			animation: {
				'fade-up': 'fade-up 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
				'fade-right': 'fade-right 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
				'glow-pulse': 'glow-pulse 6s ease-in-out infinite'
			}
		}
	},
	plugins: []
};
