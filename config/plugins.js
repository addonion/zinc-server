module.exports = ({ env }) => ({
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
    },
  },
});
