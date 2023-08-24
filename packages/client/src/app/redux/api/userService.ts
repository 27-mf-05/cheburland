import { User } from '@/shared'

export interface UserRepository {
  getCurrentUser(): Promise<User>
}

export class UserService {
  constructor(private _repo: UserRepository) {}

  getCurrentUser() {
    return this._repo.getCurrentUser()
  }
}
