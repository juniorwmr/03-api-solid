import fastify from 'fastify'

import { appRoutes } from '@/http/routes/routes'
import { handlerError } from '@/errors/handler-error'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler(handlerError)
