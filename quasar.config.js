/* eslint-env node */
const { configure } = require("quasar/wrappers");

module.exports = configure(function (/* ctx */) {
  return {
    boot: ["pinia", "firebase"],

    css: ["app.scss"],

    extras: ["material-icons"],

    build: {
      target: {
        browser: ["es2020"],
        node: "node18",
      },
      vueRouterMode: "hash",
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {},
      plugins: ["Loading", "Notify", "Dialog"],
    },

    animations: [],

    pwa: {
      workboxMode: "generateSW",
      manifest: {
        name: "Nitra Clinic Leverage Game",
        short_name: "Nitra Game",
        description: "Multiplayer clinic expansion game powered by Nitra",
        display: "fullscreen",
        orientation: "portrait",
        background_color: "#0a1628",
        theme_color: "#0070f3",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },
  };
});
