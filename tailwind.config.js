const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./index.html", "./src/**/*.{svelte,js}"],
    mode: "jit",
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: colors.coolGray,
            },
            spacing: {
                128: "32rem",
                144: "36rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
