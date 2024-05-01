import { CreateClientUseCase } from '@/domain/application/use-cases/create-client'
import { ClientAlreadyExistsError } from '@/domain/application/use-cases/errors/client-already-exists-error'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'

let inMemoryClientsRepository: InMemoryClientsRepository
let fakeHasher: FakeHasher
let sut: CreateClientUseCase

describe('Create Client', async () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    fakeHasher = new FakeHasher()

    sut = new CreateClientUseCase(inMemoryClientsRepository, fakeHasher)
  })

  it('should be able to create a client', async () => {
    const result = await sut.execute({
      name: 'Client name',
      email: 'client123@gmail.com',
      password: '123456789',
    })

    expect(result.isLeft()).toBe(false)
    expect(result.value).toEqual({
      client: inMemoryClientsRepository.items[0],
    })
  })

  it('should hash client password before creating it', async () => {
    const result = await sut.execute({
      name: 'Client name',
      email: 'client123@gmail.com',
      password: '123456789',
    })

    const hashedPassword = await fakeHasher.hash('123456789')

    expect(result.isRight()).toBe(true)
    expect(inMemoryClientsRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should be able to create a client if it already exists', async () => {
    await sut.execute({
      name: 'Client name',
      email: 'client123@gmail.com',
      password: '123456789',
    })

    const result = await sut.execute({
      name: 'Client name',
      email: 'client123@gmail.com',
      password: '123456789',
    })

    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(ClientAlreadyExistsError)
  })
})
