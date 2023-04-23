import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'

import {
  InMemoryCheckInsRepository,
  InMemoryGymsRepository,
} from '@/repositories/in-memory'
import { CheckInUseCase } from './checkin'
import {
  MaxDistanceError,
  MaxNumberOfCheckInsError,
  ResourceNotFoundError,
} from './errors'

describe('CheckInUseCase', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    const gym = await gymsRepository.create({
      name: 'Js Gym',
      city: 'São Paulo',
      state: 'SP',
      address: 'Rua do JavaScript, 123',
      phone: '11 99999-9999',
      zip: '12345-678',
      latitude: -27.2092051,
      longitude: -49.6401091,
    })

    const newCheckIn = {
      gymId: gym.id,
      userId: 'user-id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }

    const { checkIn } = await sut.execute(newCheckIn)
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check-in if gym doesn't exists", async () => {
    const newCheckIn = {
      gymId: 'fake-id',
      userId: 'user-id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }

    await expect(async () => sut.execute(newCheckIn)).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 1, 0, 0))

    const gym = await gymsRepository.create({
      name: 'Js Gym',
      city: 'São Paulo',
      state: 'SP',
      address: 'Rua do JavaScript, 123',
      phone: '11 99999-9999',
      zip: '12345-678',
      latitude: -27.2092051,
      longitude: -49.6401091,
    })

    const newCheckIn = {
      gymId: gym.id,
      userId: 'user-id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }

    await sut.execute(newCheckIn)

    await expect(async () => sut.execute(newCheckIn)).rejects.toBeInstanceOf(
      MaxNumberOfCheckInsError,
    )
  })

  it('should be able to check in twice in different days', async () => {
    const gym = await gymsRepository.create({
      name: 'Js Gym',
      city: 'São Paulo',
      state: 'SP',
      address: 'Rua do JavaScript, 123',
      phone: '11 99999-9999',
      zip: '12345-678',
      latitude: -27.2092051,
      longitude: -49.6401091,
    })

    const dates = {
      firstCheckIn: new Date(2022, 0, 1, 0, 0),
      secondCheckIn: new Date(2022, 0, 2, 0, 0),
    }

    vi.setSystemTime(dates.firstCheckIn)

    const newCheckIn = {
      gymId: gym.id,
      userId: 'user-id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }

    const { checkIn: firstCheckIn } = await sut.execute(newCheckIn)

    vi.setSystemTime(dates.secondCheckIn)

    const { checkIn: secondCheckIn } = await sut.execute(newCheckIn)

    expect(firstCheckIn.id).toEqual(expect.any(String))
    expect(secondCheckIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in on distant gym', async () => {
    const gym = await gymsRepository.create({
      name: 'Js Gym',
      city: 'São Paulo',
      state: 'SP',
      address: 'Rua do JavaScript, 123',
      phone: '11 99999-9999',
      zip: '12345-678',
      latitude: -27.0747279,
      longitude: -49.4889672,
    })

    const newCheckIn = {
      gymId: gym.id,
      userId: 'user-id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }

    await expect(async () => sut.execute(newCheckIn)).rejects.toBeInstanceOf(
      MaxDistanceError,
    )
  })
})
