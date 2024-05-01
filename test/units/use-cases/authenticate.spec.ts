import { AuthenticateClientUseCase } from '@/domain/application/use-cases/authenticate-client'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeClient } from 'test/factories/make-client'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'

let inMemoryClientsRepository: InMemoryClientsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateClientUseCase

describe('Authenticate Client', async () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateClientUseCase(
      inMemoryClientsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a client', async () => {
    const client = makeClient({
      email: 'client123@gmail.com',
      password: await fakeHasher.hash('123456789'),
    })

    await inMemoryClientsRepository.create(client)

    const result = await sut.execute({
      email: 'client123@gmail.com',
      password: '123456789',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate a client if email is incorrect', async () => {
    const client = makeClient({
      name: 'Client name',
      email: 'client123@gmail.com',
      password: '123456789',
    })

    await inMemoryClientsRepository.create(client)

    const result = await sut.execute({
      email: 'wrongemail@gmail.com',
      password: '123456789',
    })

    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate a client if password is incorrect', async () => {
    const client = makeClient({
      name: 'Client name',
      email: 'client123@gmail.com',
      password: '123456789',
    })

    await inMemoryClientsRepository.create(client)

    const result = await sut.execute({
      email: 'client123@gmail.com',
      password: 'wrong password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
