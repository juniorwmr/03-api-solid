export type Gym = {
  id: string
  name: string
  phone: string | null
  address: string
  city: string
  state: string
  zip: string
  latitude: number
  longitude: number
}

export type CreateGymUseCaseRequest = {
  id?: string
  name: string
  phone: string | null
  address: string
  city: string
  state: string
  zip: string
  latitude: number
  longitude: number
}

export interface GymsRepository {
  create(gym: CreateGymUseCaseRequest): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}
