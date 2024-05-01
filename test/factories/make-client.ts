import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Client } from '@/domain/enterprise/entities/client'

export function makeClient(
  override: Partial<Client> = {},
  id?: UniqueEntityID,
) {
  const client = Client.create(
    {
      name: 'Testing name',
      email: 'emailtesting@gmail.com',
      password: '123456',
      ...override,
    },
    id,
  )

  return client
}
