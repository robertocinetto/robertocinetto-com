module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/variables.scss";
          @import "@/scss/theme.scss";`,
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
  },
};
