import { randomUUID } from 'node:crypto'

import { CheckIn, CheckInCreateInput, CheckInsRepository } from '@/repositories'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns = [] as CheckIn[]

  async create(data: CheckInCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      ...data,
      id: randomUUID(),
      created_at: new Date(),
      gym_id: data.gymId,
      user_id: data.userId,
      validated_at: data.validateAt ? new Date(data.validateAt) : null,
    }
    this.checkIns.push(checkIn)

    return checkIn
  }

  async findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<CheckIn[]> {
    const checkIns = this.checkIns.filter((checkIn) => {
      return checkIn.user_id === userId
    })

    const pageStart = (page - 1) * perPage
    const pageEnd = page * perPage
    const paginatedCheckIns = checkIns.slice(pageStart, pageEnd)

    return paginatedCheckIns
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const checkIn = this.checkIns.find(
      (checkIn) =>
        checkIn.user_id === userId &&
        checkIn.created_at >=
          new Date(date.getFullYear(), date.getMonth(), date.getDate()) &&
        checkIn.created_at <
          new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
    )

    return checkIn || null
  }
}
