import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipe/zod-valitation-pipe.pipe'
import {
  pageQueryParamSchema,
  PageQueryParamSchema,
} from '../schemas/page-query-param-schema'
import { FetchShortLinksUseCase } from '@/domain/application/use-cases/fetch-short-links'
import { ShortLinkPresenter } from '../presenters/short-link-presenter'

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/links/:clientId/short-links')
export class FetchShortLinksController {
  constructor(private fetchShortLinks: FetchShortLinksUseCase) {}

  @Get()
  async handle(
    @Param('clientId') clientId: string,
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const result = await this.fetchShortLinks.execute({
      clientId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { shortLinks } = result.value

    return {
      shortLinks: shortLinks.map(ShortLinkPresenter.toHTTP),
    }
  }
}
