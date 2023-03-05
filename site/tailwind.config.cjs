/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            margin: {
                job: '420px'
            },
            width: {
                job: '420px',
                token: '40px'
            },
            height: {
                'el-closed': '0',
                token: '40px',
                'el-open': 'fit-content',
            },
            borderRadius: {
                'none': '0',
                'sm': '.125rem',
                DEFAULT: '.375rem',
                'lg': '.5rem',
                'full': '9999px',
            },
            gap: {
                DEFAULT: '.5rem'
            },
            transitionDuration: {
                DEFAULT: '300ms'
            },
            padding: {
                DEFAULT: '.5rem'
            },
            colors: {
                "accent": "#ffffff",
                "primary": "#985194",
                "secondary": "#911989",
                "tertiary": "#281150",
                "dark": "#000923",
                "success": '#57F287',
                "error": '#ED4245',
            }
        },
    },
    plugins: [],
}