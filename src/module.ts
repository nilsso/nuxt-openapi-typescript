import { defineNuxtModule, createResolver, addImportsSources, addTemplate, useLogger } from '@nuxt/kit'
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
    apiSchemaUrl: process.env.API_SCHEMA_URL,
    apiSchemaFormat: 'json'
  },
  async setup(options, nuxt) {
    if (!options.apiUrl) {
      throw new Error('API_URL not set')
    }
    const { resolve } = createResolver(import.meta.url)
    const logger = useLogger('nuxt-openapi-typescript')
    const schemaUrl = getSchemaUrl(options)

    nuxt.options.runtimeConfig.public.openapiTS = defu(
      nuxt.options.runtimeConfig.public.openapiTS,
      options,
    )

    logger.info(`fetching API schema at ${schemaUrl}`)
    addTemplate({
      filename: 'api.d.ts',
      write: true,
      getContents: () => openapiTS(schemaUrl),
    })
    addTemplate({
      filename: 'nuxt-openapi-typescript.d.ts',
      write: true,
      getContents: () => {
        return `\
import { useOpenAPI as _useOpenAPI } from '${resolve('runtime/composables/useOpenAPI')}'
import { paths } from './api'

export const useOpenAPI = _useOpenAPI<paths>\
            `
      }
    })
    addImportsSources({
      from: '#build/nuxt-openapi-typescript',
      imports: [['useOpenAPI', 'useOpenAPI']]
    })
  }
})
