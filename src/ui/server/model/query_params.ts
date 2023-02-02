export class QueryParams<M, P> {
  constructor(
    public params?: P,
    public filter?: {
      [key in keyof M]?: M[key]
    },
    public sort_by?: {
      [key in keyof M]?: `ASC` | `DSC`
    },
    public pagination?: {
      page?: number
      limit?: number
    },
  ) {}

  static create = <M, P>(req: QueryParams<M, P>) =>
    new QueryParams<M, P>(req.params, req.filter, req.sort_by, req.pagination)
}

export class InputQueryArg<M, P> {
  constructor(public input?: QueryParams<M, P>) {}
}
