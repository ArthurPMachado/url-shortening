import { z } from 'zod'

export const authenticationPayloadSchema = z.object({
  sub: z.string().uuid(),
})

export type AuthenticationPayloadSchema = z.infer<
  typeof authenticationPayloadSchema
>
