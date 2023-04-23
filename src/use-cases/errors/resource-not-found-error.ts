import { BaseError } from '@/errors/base-error'
import { HttpStatusCode } from '@/utils/http-status-code'

export class ResourceNotFoundError extends BaseError {
  constructor(
    {
      resource,
    }: {
      resource: string
    },
    additionalDetails = null,
  ) {
    super({
      name: 'RESOURCE_NOT_FOUND_ERROR',
      description: `${resource} not found`,
      httpCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
      additionalDetails,
    })
  }
}
