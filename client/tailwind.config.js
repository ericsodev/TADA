module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "Arial", "sans-serif"],
                display: ["Metropolis", "Oswald"],
                mono: ["ui-monospace", "SFMono-Regular"],
            },
            translate: {
                "2x": "200%",
            },
            maxWidth: {
                "16ch": "16ch",
                "24ch": "24ch",
                "32ch": "32ch",
                "48ch": "48ch",
                "64ch": "64ch",
                "75ch": "75ch",
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["disabled"],
        },
    },
    plugins: [],
};
