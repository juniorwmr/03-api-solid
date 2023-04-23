import { prisma } from '@/lib/prisma'
import { User, UserCreateInput, UsersRepository } from '@/repositories'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateInput): Promise<User> {
    return prisma.user.create({ data })
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}
