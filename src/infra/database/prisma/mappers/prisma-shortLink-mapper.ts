import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ShortLink } from '@/domain/enterprise/entities/shortLink'
import { ShortLinks as PrismaAppShortLink, Prisma } from '@prisma/client'

export class PrismaShortLinkMapper {
  static toDomain(raw: PrismaAppShortLink): ShortLink {
    const shortLinkDomain = ShortLink.create(
      {
        clientId: new UniqueEntityID(raw.clientId),
        code: raw.code,
        originalUrl: raw.originalUrl,
        numberOfAccess: raw.numberOfAccess,
        isDeleted: raw.isDeleted,
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
      clientId: shortLink.clientId.toString(),
      code: shortLink.code,
      originalUrl: shortLink.originalUrl,
      numberOfAccess: shortLink.numberOfAccess,
      isDeleted: shortLink.isDeleted,
      createdAt: shortLink.createdAt,
      updatedAt: shortLink.updatedAt,
    }

    return shortLinkPrisma
  }
}
