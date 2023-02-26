import * as _nuxt_schema from '@nuxt/schema';

interface ModuleOptions {
    /** API base url
     * @default process.env.API_URL
     */
    apiUrl?: string;
    apiSchemaUrl?: string;
    apiSchemaFormat: 'json' | 'yaml';
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

export { ModuleOptions, _default as default };
