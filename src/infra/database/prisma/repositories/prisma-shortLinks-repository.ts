import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { IShortLinksRepository } from '@/domain/application/repositories/shortLinks-repository'
import { ShortLink } from '@/domain/enterprise/entities/shortLink'
import { PrismaShortLinkMapper } from '../mappers/prisma-shortLink-mapper'

@Injectable()
export class PrismaShortLinksRepository implements IShortLinksRepository {
  constructor(private prisma: PrismaService) {}

  async create(shortLink: ShortLink): Promise<void> {
    const data = PrismaShortLinkMapper.toPrisma(shortLink)

    await this.prisma.shortLinks.create({
      data,
    })
  }

  async findByCode(code: string): Promise<ShortLink | null> {
    const shortLink = await this.prisma.shortLinks.findFirst({
      where: {
        code,
      },
    })

    if (!shortLink) {
      return null
    }

    return PrismaShortLinkMapper.toDomain(shortLink)
  }

  async incrementAccess(id: string): Promise<void> {
    await this.prisma.shortLinks.update({
      where: {
        id,
      },
      data: {
        numberOfAccess: {
          increment: 1,
        },
      },
    })
  }
}
