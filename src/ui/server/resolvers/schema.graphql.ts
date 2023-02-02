import { gql } from 'graphql-tag'

const RootQueryTypeDef = gql(`

  scalar Date
  scalar BigNum
  scalar JSON

  type Example {
    id: String
    name: String
    description: String
    created_at: Date
    updated_at: Date
  }

  input ExampleInputParams {
    id: String
    name: String
    sort: JSON
  }

  input PaginationInput {
    page: Int
    limit: Int
  }

  input ExampleInput {
    params: ExampleInputParams
    pagination: PaginationInput
  }

  type ExampleResponse {
    items: [Example]
    meta: Meta!
  }

  type Meta {
    page: Int!
    lastPage: Int!
    count: Int!
    total: Int!
  }

  type Query {
    Example (input: ExampleInput): ExampleResponse
  }
`)

export const AppNameGraphqlSchema = RootQueryTypeDef
