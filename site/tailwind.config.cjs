/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "discord-1": "#7289da",
                "discord-2": "#424549",
                "discord-3": "#36393e",
                "discord-4": "#282b30",
                "discord-5": "#1e2124"
            }
        },
    },
    plugins: [],
}