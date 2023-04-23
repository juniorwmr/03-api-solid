import { BaseError } from '@/errors/base-error'
import { HttpStatusCode } from '@/utils/http-status-code'

export class MaxNumberOfCheckInsError extends BaseError {
  constructor(additionalDetails = null) {
    super({
      name: 'MAX_NUMBER_OF_CHECKINS_ERROR',
      description: 'You have reached the maximum number of check-ins for today',
      httpCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
      additionalDetails,
    })
  }
}
