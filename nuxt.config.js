// eslint-disable-next-line nuxt/no-cjs-in-config
const axios = require("axios");

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: "static",
    reactiveLoading: true,
    ssr: true,
    buildDir: "dist",
    googleAnalytics: {
        id: "UA-162813089-1"
    },
    sitemap: {
        hostname: "https://selinajulia.com"
    },

    theme: {
        extend: {
            colors: {
                "regal-blue": "#243c5a"
            }
        }
    },

    env: {
        baseUrl: process.env.BASE_URL,
        nodeEnv: process.env.NODE_ENV
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "Selina Julia",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "Selina Julia",
                name: "Selina Julia",
                content: "Web developer and designer"
            },
            { name: "format-detection", content: "telephone=no" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Inter&display=swap"
            }
        ]
    },

    css: [],
    plugins: [],
    components: true,

    buildModules: [
        "@nuxt/typescript-build",
        "@nuxtjs/stylelint-module",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-analytics",
        "@nuxtjs/date-fns"
    ],
    modules: [
        "@nuxtjs/sitemap",
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        [
            "storyblok-nuxt",
            {
                accessToken:
                    process.env.NODE_ENV === "production"
                        ? "P0fRQZ2ZO5pVkdaMLRxCzAtt"
                        : "ghUgpDuuhHYTeKz8sNDd7gtt",
                cacheProvider: "memory"
            }
        ]
    ],

    generate: {
        fallback: true,
        routes() {
            return axios
                .get(
                    "https://api.storyblok.com/v1/cdn/stories?version=published&token=P0fRQZ2ZO5pVkdaMLRxCzAtt&starts_with=blog&cv=" +
                        Math.floor(Date.now() / 1e3)
                )
                .then((res) => {
                    const blogPosts = res.data.stories.map(
                        (bp) => bp.full_slug
                    );
                    return ["/", "/blog", "/about", "/projects", ...blogPosts];
                });
        }
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
};
