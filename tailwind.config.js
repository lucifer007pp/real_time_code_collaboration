/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',  // correct path
    ],
    safelist: [
        {
            pattern: /react-select__.+/,
        },
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
