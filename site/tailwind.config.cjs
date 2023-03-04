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
                "primary": "#424549",
                "secondary": "#1b3370",
                "tertiary": "#1d1f23",
                "dark": "#000d2f",
                "success": '#57F287',
                "error": '#ED4245',
            }
        },
    },
    plugins: [],
}