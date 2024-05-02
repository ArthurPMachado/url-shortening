import { z } from 'zod'

export const createShortLinkBodySchema = z.object({
  originalUrl: z.string().url(),
})

export type CreateShortLinkBodySchema = z.infer<
  typeof createShortLinkBodySchema
>
