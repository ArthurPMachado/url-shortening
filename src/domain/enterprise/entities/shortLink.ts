import { Entity } from '@/core/entities/entity'
import { IShorLinkProps } from './interfaces/IShortLinkProps'
import { Optional } from '@prisma/client/runtime/library'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class ShortLink extends Entity<IShorLinkProps> {
  static create(
    props: Optional<
      IShorLinkProps,
      'createdAt' | 'updatedAt' | 'isDeleted' | 'numberOfAccess'
    >,
    id?: UniqueEntityID,
  ) {
    const shortLink = new ShortLink(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        isDeleted: props.isDeleted ?? false,
        numberOfAccess: props.numberOfAccess ?? 0,
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

  get numberOfAccess() {
    return this.props.numberOfAccess
  }

  get isDeleted() {
    return this.props.isDeleted
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
