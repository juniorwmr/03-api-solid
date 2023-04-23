import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(6).max(100),
    })
    .strict()

  const { email, password } = authenticateBodySchema.parse(request.body)

  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)
  await authenticateUseCase.execute({
    email,
    password,
  })

  return reply.status(200).send()
}
