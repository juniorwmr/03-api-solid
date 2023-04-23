export type User = {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date
}

export type UserCreateInput = {
  name: string
  email: string
  password_hash: string
}

export interface UsersRepository {
  create(data: UserCreateInput): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
