import { Injectable } from '@graphql-modules/di'
import { Resolver, FieldResolver, Root } from 'type-graphql'

import Recipe from './recipe.type'
import { BaseResolver } from 'base-resolver/BaseResolver'
import { Recipes } from '../../seeds/recipe.seed';

@Injectable()
@Resolver(of => Recipe)
export default class RecipeResolver extends BaseResolver(Recipe, Recipes) {

    // dynamically created field with resolver for all child resource classes
  @FieldResolver({ name: 'uuid' })
  protected getUuid (@Root() recipe: Recipe): string {
    return `${recipe.title}_${recipe.id}`
  }
}
