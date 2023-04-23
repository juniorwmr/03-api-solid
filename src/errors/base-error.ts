import { HttpStatusCode } from '@/utils/http-status-code'

type BaseErrorProps = {
  name: string
  httpCode: HttpStatusCode
  description: string
  isOperational: boolean
  additionalDetails: any
}

export class BaseError extends Error {
  public readonly name: string
  public readonly httpCode: HttpStatusCode
  public readonly isOperational: boolean
  public additionalDetails: any = null

  constructor({
    name,
    httpCode,
    description,
    isOperational,
    additionalDetails,
  }: BaseErrorProps) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.httpCode = httpCode
    this.isOperational = isOperational
    this.additionalDetails = additionalDetails
  }
}
