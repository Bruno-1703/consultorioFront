import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: "http://localhost:3006/graphql",
    documents:  './apis/consultorio/**/*.{ts,tsx}',
    overwrite: true,
    generates: {
        './graphql/types.tsx': {
            plugins: ['typescript', 'typescript-react-apollo','typescript-operations'],
            config: {
                defaultBaseOptions: {
                    context: { clientName: "consultorioLink" },
                },
                withMutationFn: true,
                withHOC: false,
                withHooks: true,
                withComponent: false
            },
        },
    },
}
export default config
