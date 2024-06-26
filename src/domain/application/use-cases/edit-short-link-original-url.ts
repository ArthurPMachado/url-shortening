import { Injectable } from '@nestjs/common'
import { IShortLinksRepository } from '../repositories/shortLinks-repository'
import { left, right } from '@/core/either'
import {
  IEditShortLinkOriginalUrlUseCaseRequest,
  IEditShortLinkOriginalUrlUseCaseResponse,
} from './interfaces/IEditShortLinkOriginalUrl'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ShortLinkDeletedError } from './errors/short-link-deleted-error'

@Injectable()
export class EditShortLinkOriginalUrlUseCase {
  constructor(private shortLinkRepository: IShortLinksRepository) {}

  async execute({
    shortLinkId,
    newUrl,
  }: IEditShortLinkOriginalUrlUseCaseRequest): Promise<IEditShortLinkOriginalUrlUseCaseResponse> {
    const shortLink = await this.shortLinkRepository.findById(shortLinkId)

    if (!shortLink) {
      return left(new ResourceNotFoundError())
    }

    if (shortLink.isDeleted) {
      return left(new ShortLinkDeletedError())
    }

    shortLink.originalUrl = newUrl

    await this.shortLinkRepository.save(shortLink)

    return right({
      shortLink,
    })
  }
}
