import type { AccessPrincipal } from "@server/ui/models/access"
import { isEmpty } from "@turnkeyid/utils-ts"
import { serverLogger } from "../logger/server_logger"

class GraphqlControllers {
  public ExampleUseCase?: Record<any, unknown>
}

export class GraphqlContext {
  constructor(
    public request: Express.Request,
    public response: Express.Response,
    public access?: AccessPrincipal,

    public controllers = new GraphqlControllers(),

    public lambda?: {
      event?: Record<string, any>;
      context?: Record<string, any>;
    },

    public cache?: {
      //
    },

    public logger = serverLogger,
  ) {}

  public static createNew = (request: GraphqlContext) =>
    new GraphqlContext(
      request.request,
      request.response,
      request.access,
      isEmpty(request.controllers) ? request.controllers : new GraphqlControllers(),
      request.lambda,
      request.cache,
      request.logger,
    )
}
