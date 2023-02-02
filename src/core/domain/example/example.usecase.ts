import { RequestContext } from "@server/core/models/request_context";
import { ExampleDTOUtil } from "@server/gateway/database/mikro-orm/dtos/example_dto.util";
import { Result_ } from "@turnkeyid/utils-ts";
import { ExampleModel } from "./models/example.model";

export const ExampleUseCase = async (_context: RequestContext) => {
  // const [exampleDTO] = await Promise.all([ExampleDTOUtil(_context)])

  const fetchAllExamples = async () => {
    // const examples = await exampleDTO.getExamples({})
    // if (!examples.isOk)
    //   return examples
    // return Result_.ok(examples.value)

    let datas: ExampleModel[] = [
      ExampleModel.factory({
        name: 'example 1',
        description: 'example 1 description',
      }),
      ExampleModel.factory({
        name: 'example 2',
        description: 'example 2 description',
      }),
    ]

    if (!datas)
      return Result_.err({
        message: `No data found`,
      })

    return Result_.ok(datas)
  }

  return {
    fetchAllExamples,
  }
}