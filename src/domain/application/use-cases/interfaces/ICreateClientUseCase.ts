import { Either } from '@/core/either'
import { ClientAlreadyExistsError } from '../errors/client-already-exists-error'
import { Client } from '@/domain/enterprise/entities/client'

export interface ICreateClientUseCaseRequest {
  name: string
  email: string
  password: string
}

export type ICreateClientUseCaseResponse = Either<
  ClientAlreadyExistsError,
  {
    client: Client
  }
>
