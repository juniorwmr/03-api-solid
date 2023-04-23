import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { GetUserProfileUseCase } from './get-user-profile'

describe('GetUserProfileUseCase', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: GetUserProfileUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile by id', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    }

    const user = await usersRepository.create(newUser)

    const { user: userExists } = await sut.execute({
      userId: user.id,
    })

    expect(userExists.id).toBe(user.id)
    expect(userExists.name).toBe(newUser.name)
    expect(userExists.email).toBe(newUser.email)
  })

  it('should not be able to get a user profile with wrong id', async () => {
    await expect(
      async () =>
        await sut.execute({
          userId: 'wrong-user-id',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
