import { Client } from '@/domain/enterprise/entities/client'

export abstract class IClientsRepository {
  abstract create(client: Client): Promise<void>
  abstract findByEmail(email: string): Promise<Client | null>
}
