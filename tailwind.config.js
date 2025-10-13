/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif']
			},
			colors: {
				canvas: {
					DEFAULT: '#0b0b0f',
					soft: '#16162a'
				},
				primary: {
					DEFAULT: '#7c5cff',
					soft: '#a48aff'
				},
				accent: '#58ffc5'
			},
			boxShadow: {
				glow: '0 0 60px rgba(124, 92, 255, 0.45)'
			},
				backgroundImage: {
					'grid-fade':
						'radial-gradient(circle at 1px 1px, rgba(88, 255, 197, 0.3) 1px, transparent 0)'
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
						'0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
						'50%': { opacity: '0.9', transform: 'scale(1.1)' }
					}
				},
				animation: {
					'fade-up': 'fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
					'fade-right': 'fade-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
					'glow-pulse': 'glow-pulse 6s ease-in-out infinite'
				}
			}
		},
		plugins: []
	};
