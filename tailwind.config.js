/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./app/components/**/*.{js,vue,ts}', './app/layouts/**/*.vue', './app/pages/**/*.vue', './app/plugins/**/*.{js,ts}', './app/app.vue', './app/error.vue'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Poppins',
  				'sans-serif'
  			]
  		},
  		colors: {
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  plugins: []
};
