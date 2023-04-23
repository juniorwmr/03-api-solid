import { User, UsersRepository } from '@/repositories'
import { ResourceNotFoundError } from './errors/resource-not-found'

type GetUserProfileUseCaseRequest = {
  userId: string
}

type GetUserProfileUseCaseResponse = {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError({
        resource: 'User',
      })
    }

    return {
      user,
    }
  }
}
