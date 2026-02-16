/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          // Paleta Primaria - Manual de Marca Sirius 2023
          'sirius-green': '#00B602',        // Verde Alegría
          'sirius-blue': '#0154AC',         // Azul Barranca
          'sirius-sky': '#00A3FF',          // Azul Cielo
          'sirius-dark': '#1A1A33',         // Imperial
          // Paleta Secundaria - Gradientes
          'sirius-subtle': '#BCD7EA',       // Sutileza
          'sirius-subtle-light': '#ECF1F4', // Sutileza claro
          'sirius-cotiledon': '#BCD983',    // Cotiledon
          'sirius-cotiledon-light': '#F2FFDD', // Cotiledon claro
          'sirius-sprout': '#CFE4BF',       // Primera retoño
          'sirius-sprout-light': '#F3F9F0', // Primera retoño claro
        },
        fontFamily: {
          sans: ['Arial', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }