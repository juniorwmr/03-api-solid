import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory'
import { SearchGymUseCase } from './search-gyms'

describe('SearchGymsUseCase', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      name: 'Js Gym',
      city: 'São Paulo',
      state: 'SP',
      address: 'Rua do JavaScript, 123',
      phone: '11 99999-9999',
      zip: '12345-678',
      latitude: -27.0747279,
      longitude: -49.4889672,
    })

    await gymsRepository.create({
      name: 'Typescript Gym',
      city: 'Rio de Janeiro',
      state: 'RJ',
      address: 'Rua do Typescript, 124',
      phone: '11 99999-9999',
      zip: '89794-988',
      latitude: -23.1047279,
      longitude: -45.4889672,
    })

    const { gyms } = await sut.execute({
      query: 'Js Gym',
      page: 1,
    })
    

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Js Gym' }),
    ])
  })

  it('should be able to search paginated gyms', async () => {
    for (let i = 0; i < 22; i++) {
      await gymsRepository.create({
        name: `Js Gym ${i}`,
        city: 'São Paulo',
        state: 'SP',
        address: 'Rua do JavaScript, 123',
        phone: '11 99999-9999',
        zip: '12345-678',
        latitude: -27.0747279,
        longitude: -49.4889672,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Js Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Js Gym 20' }),
      expect.objectContaining({ name: 'Js Gym 21' }),
    ])
  })
})
