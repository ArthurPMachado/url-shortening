import { Either } from '@/core/either'
import { ShortLink } from '@/domain/enterprise/entities/shortLink'

export interface ICreateShortLinkUseCaseRequest {
  clientId?: string
  originalUrl: string
}

export type ICreateShortLinkUseCaseResponse = Either<
  null,
  {
    shortLink: ShortLink
  }
>
