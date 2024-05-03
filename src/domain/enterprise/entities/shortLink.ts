import { Entity } from '@/core/entities/entity'
import { IShorLinkProps } from './interfaces/IShortLinkProps'
import { Optional } from '@prisma/client/runtime/library'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class ShortLink extends Entity<IShorLinkProps> {
  static create(
    props: Optional<IShorLinkProps, 'createdAt' | 'updatedAt' | 'isDeleted'>,
    id?: UniqueEntityID,
  ) {
    const shortLink = new ShortLink(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        isDeleted: props.isDeleted ?? false,
      },
      id,
    )

    return shortLink
  }

  get clientId() {
    return this.props.clientId
  }

  get code() {
    return this.props.code
  }

  get originalUrl() {
    return this.props.originalUrl
  }

  set originalUrl(originalUrl: string) {
    this.props.originalUrl = originalUrl
    this.touch()
  }

  get isDeleted() {
    return this.isDeleted
  }

  set isDeleted(isDeleted: boolean) {
    this.props.isDeleted = isDeleted
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
