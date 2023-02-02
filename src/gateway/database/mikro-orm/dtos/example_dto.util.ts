import type { ExampleModel } from "@server/core/domain/example/models/example.model"
import type { RequestContext } from "@server/core/models/request_context"
import type { DeepPartial, ModelQueryType } from "@turnkeyid/utils-ts"
import { isEmpty, Result_ } from "@turnkeyid/utils-ts"
import { DatabaseDTOError } from "@turnkeyid/utils-ts/utils"
import { ExampleEntity } from "../entities/example.entity"
import { AppNameBaseDatabaseOrm } from "../utils/appname_base_database_orm"

export const ExampleDTOUtil = async (_context: RequestContext) => {
  const _base = AppNameBaseDatabaseOrm<ExampleModel, ExampleEntity>({
    clientID: _context.client_id,
  }, ExampleEntity)

  _base.setModelMapper(ExampleEntity.mapToModel)

  const addExample = async (transaction: ExampleModel) => {
    try {
      const created = await _base.create({ ...transaction })
      if (isEmpty(created))
        return Result_.err(`[addExample]: add ${ transaction.id } failed`)
      return Result_.ok(created)
    } catch (error) {
      return Result_.err(new DatabaseDTOError({
        method: `addExample`,
        error,
      }))
    }
  }

  const getExamples = async (
    query: ModelQueryType<ExampleModel>,
  ) => {
    try {
      const get = await _base.fetch(query)
      if (isEmpty(get))
        return Result_.err(`[getExamples]: get ${ JSON.stringify(get) } failed`)
      return Result_.ok(get)
    } catch (error) {
      return Result_.err(new DatabaseDTOError({
        method: `getExamples`,
        error,
      }))
    }
  }

  const getExampleOne = async (
    query: ModelQueryType<ExampleModel>,
  ) => {
    try {
      const get = await _base.findOne(query)
      if (isEmpty(get))
        return Result_.err(`[getExample]: get ${ JSON.stringify(get) } failed`)
      return Result_.ok(get)
    } catch (error) {
      return Result_.err(new DatabaseDTOError({
        method: `getExample`,
        error,
      }))
    }
  }

  const updateExample = async (
    query: ModelQueryType<ExampleModel>,
    updateInput: DeepPartial<ExampleModel>,
  ) => {
    try {
      const updated = await _base.update(query, { ...updateInput })
      if (isEmpty(updated))
        return Result_.err(`[updateExample]: get ${ JSON.stringify(query) } failed`)
      return Result_.ok(updated)
    } catch (error) {
      return Result_.err(new DatabaseDTOError({
        method: `updateExample`,
        error,
      }))
    }
  }

  const deleteExample = async (
    filter: ModelQueryType<ExampleModel>,
  ) => {
    try {
      const deleting = await _base.deleteOne(filter)
      return Result_.ok(`delete ${ JSON.stringify(filter) } ok`)
    } catch (error) {
      return Result_.err(
        new DatabaseDTOError({
          method: `deleteExample`,
          error,
        }),
      )
    }
  }

  return {
    addExample,
    getExamples,
    getExampleOne,
    updateExample,
    deleteExample,
  }
}
