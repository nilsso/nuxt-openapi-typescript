
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['openapiTS']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['openapiTS']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
