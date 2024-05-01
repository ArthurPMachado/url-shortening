import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { Public } from '@/infra/auth/public'
import { CreateClientUseCase } from '@/domain/application/use-cases/create-client'
import { ZodValidationPipe } from '../pipe/zod-valitation-pipe.pipe'
import {
  CreateClientBodySchema,
  createClientBodySchema,
} from '../schemas/create-client-schema'
import { ClientAlreadyExistsError } from '@/domain/application/use-cases/errors/client-already-exists-error'

const bodyValidationPipe = new ZodValidationPipe(createClientBodySchema)

@Controller('/clients')
@Public()
export class CreateClientController {
  constructor(private createClient: CreateClientUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateClientBodySchema) {
    const { name, email, password } = body

    const result = await this.createClient.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ClientAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
