import { ShortLink } from '@/domain/enterprise/entities/shortLink'

export abstract class IShortLinksRepository {
  abstract create(shortLink: ShortLink): Promise<void>
  abstract findByCode(code: string): Promise<ShortLink | null>
  abstract incrementAccess(id: string): Promise<void>
  abstract findManyByClientId(
    clientId: string,
    page: number,
  ): Promise<ShortLink[]>

  abstract findByClientId(clientId: string): Promise<ShortLink | null>
  abstract save(shortLink: ShortLink): Promise<void>
}
