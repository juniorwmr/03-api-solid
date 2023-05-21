import { GymsRepository, Gym } from '@/repositories'

type SearchGymUseCaseRequest = {
  query: string
  page: number
}

type SearchGymUseCaseResponse = {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    query,
    page
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(
      query,
      page
    )

    return {
      gyms,
    }
  }
}
