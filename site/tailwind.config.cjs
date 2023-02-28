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
            colors: {
                "discord-1": "#7289da",
                "discord-2": "#424549",
                "discord-3": "#36393e",
                "discord-4": "#282b30",
                "discord-5": "#1e2124",
                "discord-success" : '#57F287',
                "discord-error" : '#ED4245'
            }
        },
    },
    plugins: [],
}