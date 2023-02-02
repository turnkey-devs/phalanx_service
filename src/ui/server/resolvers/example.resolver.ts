import { ExampleUseCase } from "@server/core/domain/example/example.usecase"
import { ExampleModel } from "@server/core/domain/example/models/example.model"
import { isEmpty } from "@turnkeyid/utils-ts"
import { ParseQueryParams } from "../common/parse_query_params"
import { GraphqlContext } from "../model/graphql_context"
import { InputQueryArg } from "../model/query_params"

type ExampleInputParams = {
  id?: string
  name?: string
  description?: string
}

export class ExampleInput extends InputQueryArg<
ExampleModel,
ExampleInputParams
> {}

export const ExampleResolver = async (
  _: any,
  inputArg: ExampleInput,
  ctx: GraphqlContext,
) => {
  // const access = ctx.access || {}
  // if (!access.user?.isAuthenticated()) throw new Error(`Unauthorized`)

  const query = ParseQueryParams(inputArg).params ?? {}
  let { page, limit } = ParseQueryParams(inputArg).pagination ?? {}

  page = page === undefined ? 0 : page - 1

  if (limit === undefined) limit = 10

  const useCase = await ExampleUseCase({
    client_id: `999`,
  })

  const users = await useCase.fetchAllExamples()

  if (isEmpty(users)) throw new Error(`No users found`)

  const total = 2

  return {
    items: users.value,
    meta: {
      page: page ? page + 1 : 1,
      lastPage: Math.ceil(total / (limit ?? 10)),
      count: users.value?.length ?? 10,
      total: total ?? 0,
    },
  }
}

export const ExampleTypeResolvers = {
  Example: {},
}
