import { ExampleResolver, ExampleTypeResolvers } from "./example.resolver"

const RootQueryResolvers = {
  Example: ExampleResolver,
}

export const AppNameResolver = {
  Query: RootQueryResolvers,
  Example: ExampleTypeResolvers.Example,
}
