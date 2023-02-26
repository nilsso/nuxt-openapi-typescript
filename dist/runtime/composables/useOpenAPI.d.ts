export declare const useOpenAPI: () => <P extends string | number | symbol, M extends string | number | symbol, Params extends unknown>(p: P, m: M) => (p?: Params | undefined) => Promise<unknown>;
