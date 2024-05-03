import { ShortLink } from '@/domain/enterprise/entities/shortLink'

export class ShortLinkPresenter {
  static toHTTP(shortLink: ShortLink) {
    return {
      id: shortLink.id.toString(),
      clientId: shortLink.clientId.toString(),
      code: shortLink.code,
      originalUrl: shortLink.originalUrl,
      isDeleted: shortLink.isDeleted,
      createdAt: shortLink.createdAt,
      updatedAt: shortLink.updatedAt,
    }
  }
}
