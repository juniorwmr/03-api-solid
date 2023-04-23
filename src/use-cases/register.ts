import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/prisma/users'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

type RegisterUseCaseProps = {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseProps) {
    const passwordHash = await hash(password, 6)

    const findUserByEmail = await this.usersRepository.findByEmail(email)

    if (findUserByEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
