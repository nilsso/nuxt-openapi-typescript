import { defineNuxtModule, createResolver, useLogger, addTemplate, addImports } from '@nuxt/kit';
import { defu } from 'defu';
import openapiTS from 'openapi-typescript';

const getSchemaUrl = (options) => {
  console.log(options.apiSchemaUrl);
  if (options.apiSchemaUrl) {
    return options.apiSchemaUrl;
  }
  return `${options.apiUrl}/schema/openapi.${options.apiSchemaFormat}`;
};
const module = defineNuxtModule({
  meta: {
    name: "nuxt-openapi-typescript",
    configKey: "openapiTS",
    compatibility: {
      nuxt: "^3"
    }
  },
  defaults: {
    apiUrl: process.env.API_URL,
    apiSchemaUrl: process.env.API_SCHEMA_URL,
    apiSchemaFormat: "json"
  },
  // async setup(options, nuxt)
  async setup(options, nuxt) {
    if (!options.apiUrl) {
      throw new Error("API_URL not set");
    }
    const { resolve } = createResolver(import.meta.url);
    const logger = useLogger("nuxt-openapi-typescript");
    const schemaUrl = getSchemaUrl(options);
    nuxt.options.runtimeConfig.public.openapiTS = defu(
      nuxt.options.runtimeConfig.public.openapiTS,
      options
    );
    logger.info(`fetching API schema at ${schemaUrl}`);
    addTemplate({
      filename: "api.d.ts",
      getContents: () => openapiTS(schemaUrl)
    });
    addImports({
      name: "useOpenAPI",
      as: "useOpenAPI",
      from: resolve("runtime/composables/useOpenAPI")
    });
  }
});

export { module as default };
