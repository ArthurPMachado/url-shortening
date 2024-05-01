import { IClientsRepository } from '@/domain/application/repositories/clients-repository'
import { Client } from '@/domain/enterprise/entities/client'

export class InMemoryClientsRepository implements IClientsRepository {
  public items: Client[] = []

  async create(client: Client) {
    this.items.push(client)
  }

  async findByEmail(email: string) {
    const client = this.items.find((item) => item.email === email)

    if (!client) {
      return null
    }

    return client
  }
}
