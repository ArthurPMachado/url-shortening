import { left, right } from '@/core/either'
import { HashGenerator } from '../cryptography/hash-generator'
import { IClientsRepository } from '../repositories/clients-repository'
import {
  ICreateClientUseCaseRequest,
  ICreateClientUseCaseResponse,
} from './interfaces/ICreateClientUseCase'
import { ClientAlreadyExistsError } from './errors/client-already-exists'
import { Client } from '@/domain/enterprise/entities/client'

export class CreateClientUseCase {
  constructor(
    private clientsRepository: IClientsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: ICreateClientUseCaseRequest): Promise<ICreateClientUseCaseResponse> {
    const clientWithSameEmail = await this.clientsRepository.findByEmail(email)

    if (clientWithSameEmail) {
      return left(new ClientAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const client = Client.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.clientsRepository.create(client)

    return right({
      client,
    })
  }
}
