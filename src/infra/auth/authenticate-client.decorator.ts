import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { AuthenticationPayloadSchema } from '../http/schemas/authentication-payload-schema'

export const AuthenticateClient = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.client as AuthenticationPayloadSchema
  },
)
