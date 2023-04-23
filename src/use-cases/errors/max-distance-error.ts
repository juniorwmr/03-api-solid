import { BaseError } from '@/errors/base-error'
import { HttpStatusCode } from '@/utils/http-status-code'

export class MaxDistanceError extends BaseError {
  constructor(additionalDetails = null) {
    super({
      name: 'MAX_DISTANCE_ERROR',
      description: 'Distance is too far',
      httpCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
      additionalDetails,
    })
  }
}
