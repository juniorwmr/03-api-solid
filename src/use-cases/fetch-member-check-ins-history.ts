import { CheckInsRepository, CheckIn } from '@/repositories'

type FetchMemberCheckInsHistoryUseCaseRequest = {
  userId: string
  page: number
  perPage: number
}

type FetchMemberCheckInsHistoryUseCaseResponse = {
  checkIns: CheckIn[]
}

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
    perPage,
  }: FetchMemberCheckInsHistoryUseCaseRequest): Promise<FetchMemberCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
      perPage,
    )

    return {
      checkIns,
    }
  }
}
