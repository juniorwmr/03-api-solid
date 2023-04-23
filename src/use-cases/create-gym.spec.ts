import { expect, describe, it, beforeEach } from 'vitest'

import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory'

describe('CreateGymUseCase', () => {
  let sut: CreateGymUseCase

  beforeEach(() => {
    const gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      name: 'Js Gym',
      city: 'São Paulo',
      state: 'SP',
      address: 'Rua do JavaScript, 123',
      phone: '11 99999-9999',
      zip: '12345-678',
      latitude: -27.0747279,
      longitude: -49.4889672,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
