import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export interface IAccessShortLinkUseCaseRequest {
  code: string
}

export type IAccessShortLinkUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    originalUrl: string
  }
>
