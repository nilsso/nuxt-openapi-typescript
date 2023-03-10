import { type OpArgType } from 'openapi-typescript-fetch';
declare type Method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';
declare type OpenapiPaths<Paths> = {
    [P in keyof Paths]: {
        [M in Method]?: unknown;
    };
};
export declare const _useOpenAPI: <Paths extends OpenapiPaths<Paths>>() => <P extends keyof Paths, M extends keyof Paths[P], Params extends OpArgType<Paths[P][M]>>(p: P, m: M) => (p: Params) => Promise<200 extends keyof (Paths[P][M] extends infer T ? T extends Paths[P][M] ? T extends {
    responses: infer R;
} ? { [S in keyof R]: R[S] extends {
    schema?: infer S_1 | undefined;
} ? S_1 : R[S] extends {
    content: {
        'application/json': infer C;
    };
} ? C : S extends "default" ? R[S] : unknown; } : never : never : never) ? (Paths[P][M] extends infer T ? T extends Paths[P][M] ? T extends {
    responses: infer R;
} ? { [S in keyof R]: R[S] extends {
    schema?: infer S_1 | undefined;
} ? S_1 : R[S] extends {
    content: {
        'application/json': infer C;
    };
} ? C : S extends "default" ? R[S] : unknown; } : never : never : never)[keyof (Paths[P][M] extends infer T ? T extends Paths[P][M] ? T extends {
    responses: infer R;
} ? { [S in keyof R]: R[S] extends {
    schema?: infer S_1 | undefined;
} ? S_1 : R[S] extends {
    content: {
        'application/json': infer C;
    };
} ? C : S extends "default" ? R[S] : unknown; } : never : never : never) & 200] : 201 extends keyof (Paths[P][M] extends infer T ? T extends Paths[P][M] ? T extends {
    responses: infer R;
} ? { [S in keyof R]: R[S] extends {
    schema?: infer S_1 | undefined;
} ? S_1 : R[S] extends {
    content: {
        'application/json': infer C;
    };
} ? C : S extends "default" ? R[S] : unknown; } : never : never : never) ? (Paths[P][M] extends infer T ? T extends Paths[P][M] ? T extends {
    responses: infer R;
} ? { [S in keyof R]: R[S] extends {
    schema?: infer S_1 | undefined;
} ? S_1 : R[S] extends {
    content: {
        'application/json': infer C;
    };
} ? C : S extends "default" ? R[S] : unknown; } : never : never : never)[keyof (Paths[P][M] extends infer T ? T extends Paths[P][M] ? T extends {
    responses: infer R;
} ? { [S in keyof R]: R[S] extends {
    schema?: infer S_1 | undefined;
} ? S_1 : R[S] extends {
    content: {
        'application/json': infer C;
    };
} ? C : S extends "default" ? R[S] : unknown; } : never : never : never) & 201] : "default" extends keyof (Paths[P][M] extends infer T ? T extends Paths[P][M] ? T extends {
    responses: infer R;
} ? { [S in keyof R]: R[S] extends {
    schema?: infer S_1 | undefined;
} ? S_1 : R[S] extends {
    content: {
        'application/json': infer C;
    };
} ? C : S extends "default" ? R[S] : unknown; } : never : never : never) ? (Paths[P][M] extends infer T ? T extends Paths[P][M] ? T extends {
    responses: infer R;
} ? { [S in keyof R]: R[S] extends {
    schema?: infer S_1 | undefined;
} ? S_1 : R[S] extends {
    content: {
        'application/json': infer C;
    };
} ? C : S extends "default" ? R[S] : unknown; } : never : never : never)[keyof (Paths[P][M] extends infer T ? T extends Paths[P][M] ? T extends {
    responses: infer R;
} ? { [S in keyof R]: R[S] extends {
    schema?: infer S_1 | undefined;
} ? S_1 : R[S] extends {
    content: {
        'application/json': infer C;
    };
} ? C : S extends "default" ? R[S] : unknown; } : never : never : never) & "default"] : unknown>;
export {};
