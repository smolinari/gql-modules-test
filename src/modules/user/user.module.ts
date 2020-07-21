import { GraphQLModule } from '@graphql-modules/core'
import * as path from 'path'
import { buildSchemaSync } from 'type-graphql'

import RecipeResolver from './recipe.resolver'
import UserResolver from './user.resolver'

const resolvers = [RecipeResolver, UserResolver] as const

// @ts-ignore
const UserModule = new GraphQLModule({
  providers: [...resolvers],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      container: ({ context }) => context.injector,
      skipCheck: true,
      emitSchemaFile: path.resolve(__dirname, 'user-schema.gql'),
    }),
  ],
})

export default UserModule
