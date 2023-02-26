import { Fetcher, type OpArgType } from 'openapi-typescript-fetch'
import { paths as Paths } from '#build/api'
import { useRuntimeConfig } from '#imports'

export const useOpenAPI = () => {
  const { openapiTS } = useRuntimeConfig()
  const baseUrl = openapiTS.apiUrl
  const fetcher = Fetcher.for<Paths>()

  fetcher.configure({
    baseUrl: baseUrl,
    init: {
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  })

  const createApiFetch = <
    P extends keyof Paths,
    M extends keyof Paths[P],
    Params extends OpArgType<Paths[P][M]>
  >(p: P, m: M) => {
    const query = fetcher.path(p).method(m).create()
    return (p?: Params) => query(p).then(({ data }) => data)
  }

  return createApiFetch
}
