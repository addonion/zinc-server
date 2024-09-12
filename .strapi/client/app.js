/**
 * This file was automatically generated by Strapi.
 * Any modifications made will be discarded.
 */
import ckeditor from "@ckeditor/strapi-plugin-ckeditor/strapi-admin";
import i18N from "@strapi/plugin-i18n/strapi-admin";
import sentry from "@strapi/plugin-sentry/strapi-admin";
import seo from "@strapi/plugin-seo/strapi-admin";
import usersPermissions from "@strapi/plugin-users-permissions/strapi-admin";
import vercelDeploy from "strapi-plugin-vercel-deploy/strapi-admin";
import { renderAdmin } from "@strapi/strapi/admin";

renderAdmin(document.getElementById("strapi"), {
  plugins: {
    ckeditor: ckeditor,
    i18n: i18N,
    sentry: sentry,
    seo: seo,
    "users-permissions": usersPermissions,
    "vercel-deploy": vercelDeploy,
  },
});