/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'


export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindTypography,
  ],
}
