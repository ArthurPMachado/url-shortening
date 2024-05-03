import { Injectable } from '@nestjs/common'
import { IShortLinksRepository } from '../repositories/shortLinks-repository'
import {
  IFetchQuestionAnswersUseCaseRequest,
  IFetchQuestionAnswersUseCaseResponse,
} from './interfaces/IFetchShortLinksUseCase'
import { right } from '@/core/either'

@Injectable()
export class FetchShortLinksUseCase {
  constructor(private shortLinkRepository: IShortLinksRepository) {}

  async execute({
    clientId,
    page,
  }: IFetchQuestionAnswersUseCaseRequest): Promise<IFetchQuestionAnswersUseCaseResponse> {
    const shortLinks = await this.shortLinkRepository.findManyByClientId(
      clientId,
      page,
    )

    return right({
      shortLinks,
    })
  }
}
