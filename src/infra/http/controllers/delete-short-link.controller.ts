import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeleteShortLinkUseCase } from '@/domain/application/use-cases/delete-short-link'

@Controller('/links/:shortLinkId')
export class DeleteShortLinkController {
  constructor(private deleteShortLink: DeleteShortLinkUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('shortLinkId') shortLinkId: string) {
    const result = await this.deleteShortLink.execute({
      shortLinkId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
