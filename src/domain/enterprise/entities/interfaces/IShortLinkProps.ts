import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface IShorLinkProps {
  clientId: UniqueEntityID
  code: string
  originalUrl: string
  isDeleted?: boolean | null
  createdAt: Date
  updatedAt?: Date | null
}
