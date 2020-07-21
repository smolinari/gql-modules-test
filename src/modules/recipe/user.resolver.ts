import { Injectable } from '@graphql-modules/di'
import { Resolver, FieldResolver, Root } from 'type-graphql'

import User from './user.type'
import { BaseResolver } from '../../base-resolver/BaseResolver';
import Recipe from './recipe.type'
import { Recipes } from '../../seeds/recipe.seed';

@Injectable()
@Resolver(of => User)
export default class UserResolver extends BaseResolver(Recipe, Recipes){

  @FieldResolver()
  recipes(@Root() user: User) {
    return this.resourceService.getOne(user.id)
  }
}
