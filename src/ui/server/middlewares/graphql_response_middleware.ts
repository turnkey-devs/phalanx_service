import type { ApolloServerPlugin } from "@apollo/server"
import { DeepObjectPlainMerge } from "@turnkeyid/utils-ts"
import { serverLogger } from "../logger/server_logger"

export const GraphqlResponseMiddleware = (): ApolloServerPlugin => ({
  async requestDidStart() {
    return {
      async willSendResponse({ request, response }) {
        const data = DeepObjectPlainMerge(
          typeof request.variables === `object`
            ? request.variables
            : { variables: request.variables },
          typeof request.query === `object`
            ? request.query
            : { query: request.query },
        )
        serverLogger(`RESPONSE:${ request.query }`, data, `info`)
      },
      async didEncounterErrors({ request, response, errors }) {
        if (errors.length > 0 && response?.http?.status)
          response.http.status = 500
      },
    }
  },
})
