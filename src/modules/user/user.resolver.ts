import { Resolver } from 'type-graphql'

import User from './user.type'
import { BaseResolver } from '../../base-resolver/BaseResolver'
import { Users } from '../../seeds/user.seed'

@Resolver(of => User)
export default class UserResolver extends BaseResolver(User, Users) {


}
