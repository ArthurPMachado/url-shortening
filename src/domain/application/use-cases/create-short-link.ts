import { Injectable } from '@nestjs/common'
import { IShortLinksRepository } from '../repositories/shortLinks-repository'
import {
  ICreateShortLinkUseCaseRequest,
  ICreateShortLinkUseCaseResponse,
} from './interfaces/ICreateShortLinkUseCase'
import { ShortLink } from '@/domain/enterprise/entities/shortLink'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { right } from '@/core/either'
import { nanoid } from 'nanoid'

@Injectable()
export class CreateShortLinkUseCase {
  constructor(private shortLinkRepository: IShortLinksRepository) {}

  async execute({
    originalUrl,
    clientId,
  }: ICreateShortLinkUseCaseRequest): Promise<ICreateShortLinkUseCaseResponse> {
    const shortLink = ShortLink.create({
      clientId: new UniqueEntityID(clientId),
      code: nanoid(6),
      originalUrl,
    })

    await this.shortLinkRepository.create(shortLink)

    return right({
      shortLink,
    })
  }
}
