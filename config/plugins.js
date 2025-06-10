module.exports = ({ env }) => ({
  // sentry: {
  //   enabled: true,
  //   config: {
  //     dsn: "https://a8d2139368924c5389525bce27785dae@o1089146.ingest.sentry.io/4504707371630592",
  //     sendMetadata: true,
  //   },
  // },
  upload: {
    config: {
      provider: "local",
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 200,
      },
    },
  },
});
