import { z } from 'zod'

export const createClientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type createClientBodySchema = z.infer<typeof createClientBodySchema>
