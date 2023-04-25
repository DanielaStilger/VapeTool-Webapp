import { UserPermission, User } from '@vapetool/types'
import { User as FirebaseUser } from 'firebase/auth'

export const canRemove = (authorId: string, user: User | null) =>
  (user != null) &&
  (authorId === user.uid || user.permission >= UserPermission.ONLINE_MODERATOR)

export const canAdmin = (user?: User) =>
  (user != null) && user.permission === UserPermission.ONLINE_ADMIN

export const isNotAnonymous = (firebaseUser: FirebaseUser) =>
  firebaseUser ? !firebaseUser.isAnonymous : false
