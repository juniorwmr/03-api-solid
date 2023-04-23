import { randomUUID } from 'node:crypto'

import {
  User,
  UserCreateInput,
  UsersRepository,
} from '@/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users = [] as User[]

  async create(data: UserCreateInput): Promise<User> {
    const user: User = {
      ...data,
      id: randomUUID(),
      created_at: new Date(),
    }
    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      return null
    }
    return user
  }
}
