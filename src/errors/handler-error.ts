import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { BaseError } from '@/errors/base-error'
import { ZodError } from 'zod'
import { env } from '@/env'

export const handlerError = (
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof BaseError) {
    return reply.status(error.httpCode).send({
      type: error.name,
      message: error.message,
      additionalDetails: error.additionalDetails,
      // stack: error.stack,
    })
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      type: 'VALIDATION_ERROR',
      message: error.message,
      additionalDetails: error.format(),
      // stack: error.stack,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log the error in a log service
  }

  reply.status(500).send({
    type: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
    additionalDetails: 'Please contact the administrator',
    // stack: error.stack,
  })
}
