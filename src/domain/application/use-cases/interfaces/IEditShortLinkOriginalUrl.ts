import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ShortLink } from '@/domain/enterprise/entities/shortLink'

export interface IEditShortLinkOriginalUrlUseCaseRequest {
  shortLinkId: string
  newUrl: string
}

export type IEditShortLinkOriginalUrlUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    shortLink: ShortLink
  }
>
