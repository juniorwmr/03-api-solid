import { prisma } from '@/lib/prisma'
import { CheckInsRepository, CheckIn, CheckInCreateInput } from '@/repositories'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: CheckInCreateInput): Promise<CheckIn> {
    return prisma.checkIn.create({
      data: {
        gym_id: data.gymId,
        user_id: data.userId,
      },
    })
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
        },
      },
    })

    return checkIn
  }
}
