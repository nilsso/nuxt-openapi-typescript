import { defineNuxtModule, createResolver, addImports, addImportsSources, addTemplate, useLogger } from '@nuxt/kit'
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

const getUrl = (options: ModuleOptions) => {
  const apiUrl = options.apiUrl
  const schemaFormat = options.apiSchemaFormat
  if (!apiUrl) {
    throw new Error('API_URL not set')
  }
  if (options.apiSchemaUrl) {
    return options.apiSchemaUrl
  }
  return `${apiUrl}/schema/openapi.${schemaFormat}`
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
    apiSchemaUrl: process.env.API_SCHEMA_URL,
    apiSchemaFormat: 'json'
  },
  async setup(options, nuxt) {
    const schemaUrl = getUrl(options)
    const { resolve } = createResolver(import.meta.url)
    const logger = useLogger('nuxt-openapi-typescript')

    nuxt.options.runtimeConfig.public.openapiTS = defu(
      nuxt.options.runtimeConfig.public.openapiTS,
      options,
    )

    logger.info(`fetching API schema from ${schemaUrl}`)
    addTemplate({
      filename: 'api.d.ts',
      write: true,
      getContents: () => openapiTS(schemaUrl),
    })
    addTemplate({
      filename: 'nuxt-openapi-typescript.ts',
      write: true,
      getContents: () => {
        return `\
import { _useOpenAPI } from '${resolve('runtime/composables/useOpenAPI')}'
import { paths } from './api'

export const useOpenAPI = _useOpenAPI<paths>\
            `
      }
    })
    addImportsSources({
      from: '#build/nuxt-openapi-typescript',
      imports: [['useOpenAPI', 'useOpenAPI']]
    })
    // addImports({
    //   name: '_useOpenAPI',
    //   as: '_useOpenAPI',
    //   from: resolve('runtime/composables/useOpenAPI')
    // })
  }
})
