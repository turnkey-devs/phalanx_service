import { ExampleRouter } from "./example/example.router"
import { SecretRouter } from "./secret/secret.router"

/* eslint-disable @typescript-eslint/naming-convention */
export const V1Routes = {
  '/example': ExampleRouter,
  '/secret': SecretRouter,
}
/* eslint-enable @typescript-eslint/naming-convention */
