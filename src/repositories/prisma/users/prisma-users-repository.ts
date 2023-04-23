import { prisma } from '@/lib/prisma'
import { UserCreateInput, UsersRepository } from './users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateInput): Promise<void> {
    await prisma.user.create({ data })
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
