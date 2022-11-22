module.exports = ({ env }) => [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "server.zinc.cc"],
          "img-src": ["'self'", "data:", "cdn.jsdelivr.net", "strapi.io", "dl.airtable.com", `${env("R2_PUBLIC_URL")}`, "server.zinc.cc"],
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
