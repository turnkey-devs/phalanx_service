import type { RequestContext } from '@server/core/models/request_context'
import { executeTest } from '@server/__tests__/common/execute_test'
import test from 'ava'
import { ExampleModelPublic } from '../example/models/example.model'
import { ExampleUseCase } from '../example/example.usecase'

const testWrap = async (_context: RequestContext) => {
  let expected: ExampleModelPublic[] = [
    ExampleModelPublic.factory({
      name: 'example 1',
      description: 'example 1 description',
    }),
    ExampleModelPublic.factory({
      name: 'example 2',
      description: 'example 2 description',
    }),
  ]
  
  test(`example test - check if examples data match`, async t => {
    const exampleUseCase = await ExampleUseCase(_context)

    const examples = await exampleUseCase.fetchAllExamples()

    if (!examples.isOk)
      return t.fail(`${ examples.error?.message }`)

    t.deepEqual(examples.value.map(e => ExampleModelPublic.factory(e)), expected)
  })
}

executeTest(testWrap)
