import { Injectable } from '@graphql-modules/di'
import { Resolver, FieldResolver, Root } from 'type-graphql'

import UserService from './user.service'
import Recipe from './recipe.type'
import { BaseResolver } from '../../base-resolver/BaseResolver';
import { Users } from '../../seeds/user.seed';
import User from '@modules/recipe/user.type'

@Injectable()
@Resolver(of => Recipe)
export default class RecipeResolver extends BaseResolver(User, Users) {

  @FieldResolver()
  author(@Root() recipe: Recipe) {
    return this.resourceService.getOne(recipe.authorId)
  }
}
