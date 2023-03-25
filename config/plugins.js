module.exports = ({ env }) => ({
  "vercel-deploy": {
    enabled: true,
    config: {
      deployHook: env("VERCEL_DEPLOY_PLUGIN_HOOK"),
      apiToken: env("VERCEL_DEPLOY_PLUGIN_API_TOKEN"),
      appFilter: env("VERCEL_DEPLOY_PLUGIN_APP_FILTER"),
      roles: ["strapi-super-admin", "strapi-editor", "strapi-author"],
    },
  },
  sentry: {
    enabled: true,
    config: {
      dsn: "https://a8d2139368924c5389525bce27785dae@o1089146.ingest.sentry.io/4504707371630592",
      sendMetadata: true,
    },
  },
  seo: {
    enabled: true,
  },
  placeholder: {
    enabled: true,
    config: {
      size: 10,
    },
  },
  upload: {
    config: {
      provider: "strapi-provider-upload-cloudflare-r2",
      providerOptions: {
        accessKeyId: env("R2_ACCESS_KEY_ID"),
        secretAccessKey: env("R2_ACCESS_SECRET"),
        region: env("R2_REGION"),
        params: {
          Bucket: env("R2_BUCKET"),
          accountId: env("R2_ACCOUNT_ID"),
          publicUrl: env("R2_PUBLIC_URL"),
        },
      },
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
