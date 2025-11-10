/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	content: ['./src/**/*.{html,ts,scss}'],
	theme: {
		extend: {
			colors: {
				inverse: '#FBFBFB',
				base: '#1E0D01',
				disabled: '#D9D9D9',

				primary: {
					0: '#DAE0EC',
					1: '#B6C1DA',
					2: '#91A3C7',
					3: '#6C84B4',
					4: '#4F689B',
					5: '#3C4F76',
					6: '#303F5E',
					7: '#242F47',
					8: '#18202F',
					9: '#0C1018',
				},
				secondary: {
					0: '#EBF1F4',
					1: '#DBE5EA',
					2: '#C5D4DC',
					3: '#ADBECC',
					4: '#97AABD',
					5: '#7A8CA6',
					6: '#6E7D94',
					7: '#5A6679',
					8: '#4D5762',
					9: '#2D3339',
				},
				success: {
					0: '#D1FAED',
					5: '#14B983',
					9: '#073E2C',
				},
				danger: {
					0: '#FCE0E0',
					5: '#ED4547',
					9: '#5D090A',
				},
				warning: {
					0: '#FDEFD7',
					5: '#F29E0D',
					9: '#513504',
				},
				neutral: {
					0: '#F7F8F8',
					5: '#CED4D5',
					9: '#272C2D',
				},
			},
			fontFamily: {
				sans: ['"Rubik"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0, transform: 'translateY(10px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' },
				},
				tick: {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(6deg)' },
				},
				timeChange: {
					'0%': { opacity: 0.7, transform: 'scale(0.98)' },
					'100%': { opacity: 1, transform: 'scale(1)' },
				},
			},
			animation: {
				'fade-in': 'fadeIn 0.7s ease-in-out',
				tick: 'tick 1s linear infinite',
				timeChange: 'timeChange 0.3s ease-out',
			},
		},
	},
	plugins: [],
};
