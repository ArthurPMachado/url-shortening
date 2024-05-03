import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export interface IDeleteShortLinkUseCaseRequest {
  shortLinkId: string
}

export type IDeleteShortLinkUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>
