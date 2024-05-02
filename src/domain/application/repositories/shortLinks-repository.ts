import { ShortLink } from '@/domain/enterprise/entities/shortLink'

export abstract class IShortLinksRepository {
  abstract create(shortLink: ShortLink): Promise<void>
  abstract findByCode(code: string): Promise<ShortLink | null>
  abstract incrementAccess(): Promise<void>
}
