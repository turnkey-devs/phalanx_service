import type { MikroOrmBaseDatabaseORMType } from "@turnkeyid/utils-ts/utils"
import { MikroOrmBaseDatabaseORM } from "@turnkeyid/utils-ts/utils"
import { AppNameMongoDBDatabaseClient } from "../clients/appname_database_client"

export const AppNameBaseDatabaseOrm: MikroOrmBaseDatabaseORMType = <Model, Entity extends object | Record<any, any>>(
  _context,
  entity,
  options,
) => MikroOrmBaseDatabaseORM<Model, Entity>(
  _context,
  entity,
  { injections: { client: AppNameMongoDBDatabaseClient(_context) }, ...options },
)
