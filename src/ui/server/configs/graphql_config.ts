import path from "path"

export const GraphqlConfig = {
  env: process.env.ENV,
  prefix: `/v1/graphql`,
  port: Number(process.env.PORT ?? 9000),
  schemaPath: path.resolve(__dirname, `../schema.graphql`),
}
