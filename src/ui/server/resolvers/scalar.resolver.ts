import { getDate } from '@turnkeyid/utils-ts'
import { GraphQLScalarType } from 'graphql'

export const ScalarResolver = {
  Date: new GraphQLScalarType({
    name: `Date`,
    description: `Date custom scalar type`,
    parseValue(value: unknown) {
      try {
        if (typeof value === `string` || typeof value === `number`)
          return getDate(value, { utc: true }).toDate()
        throw new Error(`cannot parse ${ value } to Date`)
      } catch (error) {
        throw error
      }
    },
    serialize(value: unknown) {
      if (value instanceof Date)
        return value.getTime()
    },
  }),
  BigNum: new GraphQLScalarType({
    name: `BigNum`,
    description: `Number custom scalar type`,
    parseValue(value: unknown) {
      try {
        if (typeof value === `string` || typeof value === `number`)
          return Number(value)
        throw new Error(`cannot parse ${ value } to BigNum`)
      } catch (error) {
        throw error
      }
    },
    serialize(value: unknown) {
      if (typeof value === `number`)
        return value
    },
  }),
  JSON: new GraphQLScalarType({
    name: `JSON`,
    description: `JSON custom scalar type`,
    parseValue(value: unknown) {
      try {
        if (typeof value === `string`)
          return JSON.parse(value)
        throw new Error(`cannot parse ${ value } to JSON`)
      } catch (error) {
        throw error
      }
    },
  }),
}
