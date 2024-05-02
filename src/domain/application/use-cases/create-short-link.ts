import { Injectable } from '@nestjs/common'
import { IShortLinksRepository } from '../repositories/shortLinks-repository'
import {
  ICreateShortLinkUseCaseRequest,
  ICreateShortLinkUseCaseResponse,
} from './interfaces/ICreateShortLinkUseCase'
import { ShortLink } from '@/domain/enterprise/entities/shortLink'
import { nanoid } from 'nanoid'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { right } from '@/core/either'

@Injectable()
export class CreateShortLinkUseCase {
  constructor(private shortLinkRepository: IShortLinksRepository) {}

  async execute({
    originalUrl,
    clientId,
  }: ICreateShortLinkUseCaseRequest): Promise<ICreateShortLinkUseCaseResponse> {
    const shortLink = ShortLink.create({
      code: `http://localhost/${nanoid(6)}`,
      originalUrl,
    })

    if (clientId) {
      shortLink.clientId = new UniqueEntityID(clientId)
    }

    await this.shortLinkRepository.create(shortLink)

    return right({
      shortLink,
    })
  }
}
