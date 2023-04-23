import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('RegisterUseCase', () => {
  let sut: RegisterUseCase

  beforeEach(() => {
    const usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoeo@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register user with duplicated e-mail', async () => {
    const email = 'johndoeo@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(
      async () =>
        await sut.execute({
          name: 'John Doe',
          email,
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
