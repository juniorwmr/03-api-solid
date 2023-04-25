import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory'
import { FetchMemberCheckInsHistoryUseCase } from './fetch-member-check-ins-history'

describe('FetchMemberCheckInsHistoryUseCase', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: FetchMemberCheckInsHistoryUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchMemberCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-ins history', async () => {
    const userId = 'user-01'

    const firstCheckIn = await checkInsRepository.create({
      gymId: 'gym-01',
      userId,
    })

    const secondCheckIn = await checkInsRepository.create({
      gymId: 'gym-02',
      userId,
    })

    const { checkIns } = await sut.execute({
      userId,
      page: 1,
      perPage: 20,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: firstCheckIn.gym_id }),
      expect.objectContaining({ gym_id: secondCheckIn.gym_id }),
    ])
  })

  it('should be able to fetch paginated check-ins history', async () => {
    const userId = 'user-01'

    for (let i = 0; i < 22; i++) {
      await checkInsRepository.create({
        gymId: `gym-${i}`,
        userId,
      })
    }

    const { checkIns: checkInsFirstPage } = await sut.execute({
      userId,
      page: 1,
      perPage: 20,
    })

    expect(checkInsFirstPage).toHaveLength(20)

    const { checkIns: checkInsSecondPage } = await sut.execute({
      userId,
      page: 2,
      perPage: 20,
    })

    expect(checkInsSecondPage).toHaveLength(2)
  })
})
