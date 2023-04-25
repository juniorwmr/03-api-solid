import { CheckInsRepository, CheckIn } from '@/repositories'

type FetchMemberCheckInsHistoryUseCaseRequest = {
  userId: string
  page: number
  perPage: number
}

type FetchMemberCheckInsHistoryUseCaseResponse = {
  checkIns: {
    data: CheckIn[]
    total: number
  }
}

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
    perPage,
  }: FetchMemberCheckInsHistoryUseCaseRequest): Promise<FetchMemberCheckInsHistoryUseCaseResponse> {
    const [checkIns, total] = await Promise.all([
      this.checkInsRepository.findManyByUserId(userId, page, perPage),
      this.checkInsRepository.countByUserId(userId),
    ])

    return {
      checkIns: {
        data: checkIns,
        total,
      },
    }
  }
}
