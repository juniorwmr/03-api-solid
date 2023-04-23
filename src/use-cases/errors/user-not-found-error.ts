import { BaseError } from '@/errors/base-error'
import { HttpStatusCode } from '@/utils/http-status-code'

export class UserNotFoundError extends BaseError {
  constructor(additionalDetails = null) {
    super({
      name: 'USER_NOT_FOUND_ERROR',
      description: 'User not found',
      httpCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
      additionalDetails,
    })
  }
}
