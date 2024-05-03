import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipe/zod-valitation-pipe.pipe'
import {
  CreateShortLinkBodySchema,
  createShortLinkBodySchema,
} from '../schemas/create-short-link-schema'
import { CreateShortLinkUseCase } from '@/domain/application/use-cases/create-short-link'
import { AuthenticateClient } from '@/infra/auth/authenticate-client.decorator'
import { AuthenticationPayloadSchema } from '../schemas/authentication-payload-schema'
import { ShortLinkPresenter } from '../presenters/short-link-presenter'

const bodyValidationPipe = new ZodValidationPipe(createShortLinkBodySchema)

@Controller('/links/create-short-link')
export class CreateShortLinkController {
  constructor(private createShortLink: CreateShortLinkUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateShortLinkBodySchema,
    @AuthenticateClient() client: AuthenticationPayloadSchema,
  ) {
    const { originalUrl } = body

    const result = await this.createShortLink.execute({
      originalUrl,
      clientId: client?.sub ?? undefined,
    })

    if (result.isLeft()) {
      throw new InternalServerErrorException()
    }

    return {
      shortLink: ShortLinkPresenter.toHTTP(result.value.shortLink),
    }
  }
}
