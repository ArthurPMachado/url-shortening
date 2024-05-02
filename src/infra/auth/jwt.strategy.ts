import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import {
  AuthenticationPayloadSchema,
  authenticationPayloadSchema,
} from '../http/schemas/authentication-payload-schema'
import { EnvService } from '../env/env.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    const publicKey = env.get('JWT_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  async validate(payload: AuthenticationPayloadSchema) {
    return authenticationPayloadSchema.parse(payload)
  }
}
