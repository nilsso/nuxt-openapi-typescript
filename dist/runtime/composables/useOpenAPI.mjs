import { Fetcher } from "openapi-typescript-fetch";
import { useRuntimeConfig } from "#imports";
export const _useOpenAPI = () => {
  const { openapiTS } = useRuntimeConfig();
  const baseUrl = openapiTS.apiUrl;
  const fetcher = Fetcher.for();
  fetcher.configure({
    baseUrl,
    init: {
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
  });
  const createApiFetch = (p, m) => {
    const query = fetcher.path(p).method(m).create();
    return (p2) => query(p2).then(({ data }) => data);
  };
  return createApiFetch;
};
