import { BaseError } from '@/errors/base-error'
import { HttpStatusCode } from '@/utils/http-status-code'

export class InvalidCredentialsError extends BaseError {
  constructor(additionalDetails = null) {
    super({
      name: 'INVALID_CREDENTIALS_ERROR',
      description: 'Invalid credentials',
      httpCode: HttpStatusCode.INVALID_CREDENTIALS,
      isOperational: true,
      additionalDetails,
    })
  }
}
