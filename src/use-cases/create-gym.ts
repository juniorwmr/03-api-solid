import { GymsRepository, Gym, CreateGymUseCaseRequest } from '@/repositories'

type CreateGymUseCaseResponse = {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    name,
    phone,
    address,
    city,
    state,
    zip,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      name,
      phone,
      address,
      city,
      state,
      zip,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
