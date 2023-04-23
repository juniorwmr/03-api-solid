import { GymsRepository } from '@/repositories'
import {
  CheckIn,
  CheckInsRepository,
} from '@/repositories/check-ins-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import {
  MaxNumberOfCheckInsError,
  MaxDistanceError,
  ResourceNotFoundError,
} from './errors'

type CheckInteUseCaseRequest = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

type CheckInteUseCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInteUseCaseRequest): Promise<CheckInteUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError({
        resource: 'Gym',
      })
    }

    // calculate distance between gym and user
    const distance = await getDistanceBetweenCoordinates({
      from: {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      to: {
        latitude: gym.latitude,
        longitude: gym.longitude,
      },
    })

    // if distance is greater than 100 meters, throw error
    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      gymId,
      userId,
    })

    return {
      checkIn,
    }
  }
}
