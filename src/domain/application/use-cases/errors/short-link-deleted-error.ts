import { UseCaseError } from '@/core/errors/use-case-error'

export class ShortLinkDeletedError extends Error implements UseCaseError {
  constructor() {
    super(`Short link deleted`)
  }
}
