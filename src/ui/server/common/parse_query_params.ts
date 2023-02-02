import { safeJsonParse } from "@turnkeyid/utils-ts"
import { InputQueryArg, QueryParams } from "../model/query_params"

const toPlainObject = safeJsonParse

export const ParseQueryParams = <M, P>(queryParams: InputQueryArg<M, P> | undefined) => {
  if (!queryParams)
    return new QueryParams<M, P>()
  
  const { input } = queryParams
  
  return QueryParams.create<M, P>({
    filter: toPlainObject(input?.filter),
    pagination: toPlainObject(input?.pagination),
    params: toPlainObject(input?.params),
    sort_by: toPlainObject(input?.sort_by),
  })
}
