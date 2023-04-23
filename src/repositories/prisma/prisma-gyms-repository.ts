import { prisma } from '@/lib/prisma'
import { GymsRepository, Gym } from '@/repositories'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    return (await prisma.gym.findUnique({
      where: {
        id,
      },
    })) as Gym | null
  }
}
