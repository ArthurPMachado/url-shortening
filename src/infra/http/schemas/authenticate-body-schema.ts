import { z } from 'zod'

export const authenticateClientBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type AuthenticateClientBodySchema = z.infer<
  typeof authenticateClientBodySchema
>
