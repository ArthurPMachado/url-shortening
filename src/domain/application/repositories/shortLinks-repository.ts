import { ShortLink } from '@/domain/enterprise/entities/shortLink'

export abstract class IShortLinksRepository {
  abstract create(shortLink: ShortLink): Promise<void>
}
