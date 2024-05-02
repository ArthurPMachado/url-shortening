import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface IShorLinkProps {
  clientId?: UniqueEntityID | null
  code: string
  originalUrl: string
  createdAt: Date
  updatedAt?: Date | null
}
