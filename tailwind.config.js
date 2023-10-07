import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui({
    addCommonColors: false,
    defaultExtendTheme: 'light',
    defaultTheme: 'light',
    layout: {},
    themes: {
      light: {
        colors: {
          background: {
            50: '#fefefe',
            100: '#fdfdfd',
            200: '#fbfbfb',
            300: '#f9f9f9',
            400: '#f7f7f7',
            500: '#f5f5f5',
            600: '#b6b6b6',
            700: '#7b7b7b',
            800: '#444444',
            900: '#151515',
            DEFAULT: '#f5f5f5',
            foreground: '#353535'
          },
          primary: {
            50: '#f4f9ff',
            100: '#e8f4ff',
            200: '#d1e9ff',
            300: '#baddfe',
            400: '#a3d2fd',
            500: '#8bc6fc',
            600: '#6692bb',
            700: '#43627e',
            800: '#233547',
            900: '#070e16',
            DEFAULT: '#8BC6FC',
            foreground: '#353535'
          },
          secondary: {

          },
        }
      },
    }
  })],
}
