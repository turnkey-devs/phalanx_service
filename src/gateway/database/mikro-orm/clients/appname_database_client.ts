import { serverConfig } from "@server/core/config/server_config"
import type { MikroOrmDatabaseClientType } from "@turnkeyid/utils-ts/utils"
import { MikroOrmDatabaseClient } from "@turnkeyid/utils-ts/utils"
import { MikroOrmDatabaseConfig } from "../configs/mikroorm_database_config"
import { ExampleEntity } from "../entities/example.entity"

export const AppNameMongoDBDatabaseClient: MikroOrmDatabaseClientType
= (
  _context,
  options,
) => MikroOrmDatabaseClient(
  _context,
  {
    entities: [
      ExampleEntity
    ],
    overrideConfig: MikroOrmDatabaseConfig()
      .getConfig({
        id: _context.clientID,
        env: serverConfig().env,
      }),
    ...options,
  },
)
