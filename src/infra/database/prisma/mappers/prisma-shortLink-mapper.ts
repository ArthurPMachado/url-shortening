import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ShortLink } from '@/domain/enterprise/entities/shortLink'
import { ShortLinks as PrismaAppShortLink, Prisma } from '@prisma/client'

export class PrismaShortLinkMapper {
  static toDomain(raw: PrismaAppShortLink): ShortLink {
    const shortLinkDomain = ShortLink.create(
      {
        clientId: raw.clientId ? new UniqueEntityID(raw.clientId) : null,
        code: raw.code,
        originalUrl: raw.originalUrl,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )

    return shortLinkDomain
  }

  static toPrisma(shortLink: ShortLink): Prisma.ShortLinksUncheckedCreateInput {
    const shortLinkPrisma = {
      id: shortLink.id.toString(),
      code: shortLink.code,
      originalUrl: shortLink.originalUrl,
      createdAt: shortLink.createdAt,
      updatedAt: shortLink.updatedAt,
    }

    return shortLinkPrisma
  }
}
