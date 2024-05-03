import { Either } from '@/core/either'
import { ShortLink } from '@/domain/enterprise/entities/shortLink'

export interface IFetchQuestionAnswersUseCaseRequest {
  clientId: string
  page: number
}

export type IFetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    shortLinks: ShortLink[]
  }
>
