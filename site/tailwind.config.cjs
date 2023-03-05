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
            fontFamily: {
                'discord-light': 'discordFontLight',
                'discord-medium': 'discordFontMedium'
            },
            colors: {
                "accent": "#ffffff",
                "primary": "#5865F2",// blurple
                "secondary": "#424549",
                "tertiary": "#36393e",
                "dark": "#23272A",
                "success": '#57F287',
                "error": '#ED4245',
            }
        },
    },
    plugins: [],
}