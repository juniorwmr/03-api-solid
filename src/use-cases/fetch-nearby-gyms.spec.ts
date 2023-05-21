import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryGymsRepository } from '@/repositories/in-memory';
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms';

describe('FetchNearByGymsUseCase', () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: FetchNearByGymsUseCase;

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearByGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Near Gym',
      city: 'São Paulo',
      state: 'SP',
      address: 'Rua do JavaScript, 123',
      phone: '11 99999-9999',
      zip: '12345-678',
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    await gymsRepository.create({
      name: 'Far Gym',
      city: 'Rio de Janeiro',
      state: 'RJ',
      address: 'Rua do Typescript, 124',
      phone: '11 99999-9999',
      zip: '89794-988',
      latitude: -23.1047279,
      longitude: -45.4889672,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.0747279,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })]);
  });

});
