import { CreateGymUseCaseRequest, Gym, GymsRepository } from '@/repositories'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { randomUUID } from 'crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms = [] as Gym[]

  public async create(data: CreateGymUseCaseRequest): Promise<Gym> {
    const newGym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      phone: data.phone ?? null,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      latitude: data.latitude,
      longitude: data.longitude,
    } as Gym

    this.gyms.push(newGym)

    return newGym
  }

  async findById(id: string): Promise<Gym | null> {
    const checkIn = this.gyms.find((gym) => gym.id === id)

    return checkIn || null
  }

  async findManyNearBy(params: { latitude: number; longitude: number }): Promise<Gym[]> { 
    return this.gyms.filter(item => {
      const distance = getDistanceBetweenCoordinates({
        from: { latitude: params.latitude, longitude: params.longitude },
        to: { latitude: item.latitude, longitude: item.longitude }
      })
      return distance < 20
    })
  }

  async searchMany(query: string, page: number): Promise<Gym[]> { 
    return this.gyms.filter((gym) => gym.name.includes(query)).slice((page - 1) * 20, page * 20)
  }
}
