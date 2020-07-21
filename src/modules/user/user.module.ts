import { GraphQLModule } from '@graphql-modules/core'
import * as path from 'path'
import { buildSchemaSync } from 'type-graphql'

import RecipeResolver from './recipe.resolver'
import UserResolver from './user.resolver'
import { ResourceServiceFactory } from '../../base-resolver/ResourceService'
import Recipe from './recipe.type'

const resolvers = [RecipeResolver, UserResolver] as const

// @ts-ignore
const UserModule = new GraphQLModule({
  providers: [ResourceServiceFactory, ...resolvers],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      orphanedTypes: [Recipe],
      container: ({ context }) => UserModule.injector.getSessionInjector(context),
      skipCheck: true,
      emitSchemaFile: path.resolve(__dirname, 'user-schema.gql'),
    }),
  ],
})

export default UserModule
