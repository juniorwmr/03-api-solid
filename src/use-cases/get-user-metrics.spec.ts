import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory'
import { GetUserMetricsUseCase } from './get-user-metrics'

describe('GetUserMetricsUseCase', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: GetUserMetricsUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    const userId = 'user-01'

    for (let i = 0; i < 22; i++) {
      await checkInsRepository.create({
        gymId: `gym-${i}`,
        userId,
      })
    }

    const { checkInsCount } = await sut.execute({
      userId,
    })

    expect(checkInsCount).toBe(22)
  })
})
