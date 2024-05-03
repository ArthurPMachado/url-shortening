import { Injectable } from '@nestjs/common'
import { IShortLinksRepository } from '../repositories/shortLinks-repository'
import {
  IAccessShortLinkUseCaseRequest,
  IAccessShortLinkUseCaseResponse,
} from './interfaces/IAccessShortLinkUseCase'
import { left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

@Injectable()
export class AccessShortLinkUseCase {
  constructor(private shortLinkRepository: IShortLinksRepository) {}

  async execute({
    code,
  }: IAccessShortLinkUseCaseRequest): Promise<IAccessShortLinkUseCaseResponse> {
    const shortLink = await this.shortLinkRepository.findByCode(code)

    if (!shortLink) {
      return left(new ResourceNotFoundError())
    }

    await this.shortLinkRepository.incrementAccess(shortLink.id.toString())

    return right({
      originalUrl: shortLink.originalUrl,
    })
  }
}
