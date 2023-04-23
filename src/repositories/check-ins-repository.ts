export type CheckIn = {
  id: string
  created_at: Date
  validated_at: Date | null
  user_id: string
  gym_id: string
}

export type CheckInCreateInput = {
  userId: string
  gymId: string
  validateAt?: Date | string
}

export interface CheckInsRepository {
  create(data: CheckInCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
