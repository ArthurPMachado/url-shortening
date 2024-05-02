import { left, right } from '@/core/either'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { IClientsRepository } from '../repositories/clients-repository'
import {
  IAuthenticateClientUseCaseRequest,
  IAuthenticateClientUseCaseResponse,
} from './interfaces/IAuthenticateClientUseCase'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthenticateClientUseCase {
  constructor(
    private clientsRepository: IClientsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateClientUseCaseRequest): Promise<IAuthenticateClientUseCaseResponse> {
    const client = await this.clientsRepository.findByEmail(email)

    if (!client) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      client.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: client.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
