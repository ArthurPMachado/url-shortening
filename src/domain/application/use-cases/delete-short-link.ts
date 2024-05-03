import { Injectable } from '@nestjs/common'
import { left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { IShortLinksRepository } from '../repositories/shortLinks-repository'
import {
  IDeleteShortLinkUseCaseRequest,
  IDeleteShortLinkUseCaseResponse,
} from './interfaces/IDeleteShortLinkUseCase'

@Injectable()
export class DeleteShortLinkUseCase {
  constructor(private shortLinkRepository: IShortLinksRepository) {}

  async execute({
    shortLinkId,
  }: IDeleteShortLinkUseCaseRequest): Promise<IDeleteShortLinkUseCaseResponse> {
    const shortLink = await this.shortLinkRepository.findById(shortLinkId)

    if (!shortLink) {
      return left(new ResourceNotFoundError())
    }

    await this.shortLinkRepository.delete(shortLink)

    return right(null)
  }
}
