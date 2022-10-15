import * as health from './health/ping'
import * as user from './user/users'

export default {
    ...health,
    ...user
}