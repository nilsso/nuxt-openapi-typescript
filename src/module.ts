import { defineNuxtModule, createResolver, addImports, addTemplate, useLogger } from '@nuxt/kit'
import { defu } from 'defu'
import openapiTS from 'openapi-typescript'


export interface ModuleOptions {
  /** API base url
   * @default process.env.API_URL
   */
  apiUrl?: string,
  apiSchemaUrl?: string
  apiSchemaFormat: 'json' | 'yaml'
}

const getSchemaUrl = (options: ModuleOptions) => {
  console.log(options.apiSchemaUrl)
  if (options.apiSchemaUrl) {
    return options.apiSchemaUrl
  }
  return `${options.apiUrl}/schema/openapi.${options.apiSchemaFormat}`
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-openapi-typescript',
    configKey: 'openapiTS',
    compatibility: {
      nuxt: '^3'
    }
  },
  defaults: {
    apiUrl: process.env.API_URL,
    apiSchemaUrl: undefined,
    apiSchemaFormat: 'json'
  },
  // async setup(options, nuxt)
  async setup(options, nuxt) {
    if (!options.apiUrl) {
      throw new Error('API_URL not set')
    }
    const { resolve } = createResolver(import.meta.url)
    const logger = useLogger('nuxt-openapi-typescript')
    const schemaUrl = getSchemaUrl(options)

    logger.info(`fetching API schema at ${schemaUrl}`)
    addTemplate({
      filename: 'api.d.ts',
      getContents: () => openapiTS(schemaUrl)
    })
    addImports({
      name: 'useOpenAPI',
      as: 'useOpenAPI',
      from: resolve('runtime/composables/useOpenAPI')
    })

    nuxt.options.runtimeConfig.public.openapiTS = defu(
      nuxt.options.runtimeConfig.public.openapiTS,
      options,
    )
  }
})
