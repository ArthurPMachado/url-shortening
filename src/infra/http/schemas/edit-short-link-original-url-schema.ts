import { z } from 'zod'

export const editShortLinkOriginalUrl = z.object({
  newUrl: z.string().url(),
})

export type EditShortLinkOriginalUrl = z.infer<typeof editShortLinkOriginalUrl>
