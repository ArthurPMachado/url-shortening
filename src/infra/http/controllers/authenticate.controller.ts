import { AuthenticateClientUseCase } from '@/domain/application/use-cases/authenticate-client'
import { Public } from '@/infra/auth/public'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipe/zod-valitation-pipe.pipe'
import {
  AuthenticateClientBodySchema,
  authenticateClientBodySchema,
} from '../schemas/authenticate-body-schema'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'

const bodyValidationPipe = new ZodValidationPipe(authenticateClientBodySchema)

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private authenticateClient: AuthenticateClientUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: AuthenticateClientBodySchema) {
    const { email, password } = body

    const result = await this.authenticateClient.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
