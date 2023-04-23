import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('AuthenticateUseCase', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const password = '123456'
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash(password, 6),
    }

    await usersRepository.create(newUser)

    const { user } = await sut.execute({
      email: newUser.email,
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    const password = '123456'
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash(password, 6),
    }

    await usersRepository.create(newUser)

    await expect(
      async () =>
        await sut.execute({
          email: 'wrongemail@example.com',
          password,
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const password = '123456'
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash(password, 6),
    }

    await usersRepository.create(newUser)

    await expect(
      async () =>
        await sut.execute({
          email: newUser.email,
          password: 'wrong_password',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
