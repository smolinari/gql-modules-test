import {
  Query,
  Arg,
  Int,
  Resolver,
  ArgsType,
  Field,
  Args,
  ClassType,
} from 'type-graphql'

import { Resource } from './resource'
import { ResourceService, ResourceServiceFactory } from './ResourceService'

@ArgsType()
export class GetAllArgs {
  @Field(type => Int)
  skip: number = 0

  @Field(type => Int)
  take: number = 10
} 

export function BaseResolver<TResource extends Resource> (
  ResourceCls: ClassType,
  resources: TResource[],
) {
  const resourceName = ResourceCls.name

  // `isAbstract` decorator option is mandatory to prevent multiple registering in schema
  @Resolver(of => ResourceCls, { isAbstract: true })

  abstract class ResourceResolverClass {
    protected resourceService: ResourceService<TResource>

    constructor(factory: ResourceServiceFactory) {
      this.resourceService = factory.create(resources)
    }

    @Query(returns => ResourceCls, { name: `getOne${resourceName}` })
    protected async getOne(@Arg('id', type => Int) id: number) {
      console.log(id)
      return this.resourceService.getOne(id)
    }

    @Query(returns => [ResourceCls], { name: `getAll${resourceName}s` })
    protected async getAll (@Args() { skip, take }: GetAllArgs) {
      const all = this.resourceService.getAll(skip, take)
      return all
    }
  }

  return ResourceResolverClass
}
