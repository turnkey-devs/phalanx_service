import { ExampleUseCase } from '@server/core/domain/example/example.usecase'
import type { NextFunctionType } from '@server/ui/server/model/next_function.model'
import { Router } from 'express'
import { createErrorResponse, isErrorResponse } from '../../responses/error_response'

export const ExampleRouter = Router()

ExampleRouter.get(`/`, async (_request, _response, next: NextFunctionType) => {
  try {
    const useCase = await ExampleUseCase({
      client_id: `999`,
    })
    const result = await useCase.fetchAllExamples()

    if (!result.isOk)
      throw result.error


    next({
      response: {
        json: {
          data: result.value,
        }
      }
    })
  } catch (error) {
    next({
      error: isErrorResponse(error)
        ? error
        : createErrorResponse({ error }),
    })
  }
})
