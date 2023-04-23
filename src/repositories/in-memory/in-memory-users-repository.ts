import {
  User,
  UserCreateInput,
  UsersRepository,
} from '@/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users = [] as User[]

  async create(data: UserCreateInput): Promise<User> {
    const user: User = {
      id: String(this.users.length + 1),
      ...data,
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
}
