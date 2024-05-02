import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common'
import { Public } from '@/infra/auth/public'
import { AccessShortLinkUseCase } from '@/domain/application/use-cases/access-short-link'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Response } from 'express'

@Controller('/links')
@Public()
export class AccessShortLinkController {
  constructor(private accessShortLink: AccessShortLinkUseCase) {}

  @Get('/:code')
  async handle(@Param('code') code: string, @Res() response: Response) {
    const result = await this.accessShortLink.execute({
      code,
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

    return response.redirect(301, result.value?.originalUrl)
  }
}
