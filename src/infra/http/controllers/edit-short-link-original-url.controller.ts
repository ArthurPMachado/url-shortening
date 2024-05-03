import {
  Controller,
  Put,
  HttpCode,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipe/zod-valitation-pipe.pipe'
import { EditShortLinkOriginalUrlUseCase } from '@/domain/application/use-cases/edit-short-link-original-url'
import {
  editShortLinkOriginalUrl,
  EditShortLinkOriginalUrl,
} from '../schemas/edit-short-link-original-url-schema'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

const bodyValidationPipe = new ZodValidationPipe(editShortLinkOriginalUrl)

@Controller('/links/:shortLinkId/edit-original-url')
export class EditShortLinkOriginalUrlController {
  constructor(
    private editShortLinkOriginalUrl: EditShortLinkOriginalUrlUseCase,
  ) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('shortLinkId') shortLinkId: string,
    @Body(bodyValidationPipe) body: EditShortLinkOriginalUrl,
  ) {
    const { newUrl } = body

    const result = await this.editShortLinkOriginalUrl.execute({
      shortLinkId,
      newUrl,
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
