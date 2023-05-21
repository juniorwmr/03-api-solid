import { GymsRepository, Gym } from '@/repositories'

type FetchNearByGymsUseCaseRequest = {
    userLatitude: number
    userLongitude: number
}

type FetchNearByGymsUseCaseResponse = {
  gyms: Gym[]
}

export class FetchNearByGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return {
      gyms,
    }
  }
}
