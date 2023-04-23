import { PrismaUsersRepository } from '@/repositories/prisma'
import { RegisterUseCase } from '@/use-cases/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new RegisterUseCase(usersRepository)
}
