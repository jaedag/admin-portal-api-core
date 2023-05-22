import { Role } from '@/types'

export const isAuth = (permittedRoles: Role[], userRoles?: Role[]) => {
  if (!permittedRoles.some((r) => userRoles?.includes(r))) {
    throw new Error('You are not permitted to run this mutation')
  }
}
