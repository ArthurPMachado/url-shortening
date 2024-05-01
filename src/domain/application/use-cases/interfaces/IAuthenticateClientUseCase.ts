import { Either } from '@/core/either'
import { WrongCredentialsError } from '../errors/wrong-credentials-error'
export interface IAuthenticateClientUseCaseRequest {
  email: string
  password: string
}

export type IAuthenticateClientUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>
