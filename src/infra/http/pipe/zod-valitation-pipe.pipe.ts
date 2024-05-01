import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

@Injectable()
export class ZodValidationPipePipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: fromZodError(error),
        })
      }

      throw new BadRequestException('Validation failed')
    }
  }
}
