/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            borderRadius: {
                'none': '0',
                'sm': '.125rem',
                DEFAULT: '.375rem',
                'lg': '.5rem',
                'full': '9999px',
            },
            gap: {
                DEFAULT: '1.25rem'
            },
            padding: {
                DEFAULT: '1.25rem'
            },
            colors: {
                "accent": "#7289da",
                "primary": "#424549",
                "secondary": "#36393e",
                "darky": "#282b30",
                "dark": "#1e2124",
                "success": '#57F287',
                "error": '#ED4245',
                // "accent": "#F9AC53",
                // "primary": "#F62F80",
                // "secondary": "#153CB4",
                // "darky": "#94167F",
                // "dark": "#1a0028",
                // "success": '#1CE9A5',
                // "error": '#ED4245'
            }
        },
    },
    plugins: [],
}