import { BaseError } from '@/errors/base-error'
import { HttpStatusCode } from '@/utils/http-status-code'

export class UserAlreadyExistsError extends BaseError {
  constructor(additionalDetails = null) {
    super({
      name: 'USER_ALREADY_EXISTS_ERROR',
      description: 'User already exists',
      httpCode: HttpStatusCode.CONFLICT,
      isOperational: true,
      additionalDetails,
    })
  }
}
