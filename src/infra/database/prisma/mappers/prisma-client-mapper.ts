import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Client } from '@/domain/enterprise/entities/client'
import { Client as PrismaAppClient, Prisma } from '@prisma/client'

export class PrismaClientMapper {
  static toDomain(raw: PrismaAppClient): Client {
    const clientDomain = Client.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )

    return clientDomain
  }

  static toPrisma(client: Client): Prisma.ClientUncheckedCreateInput {
    const clientPrisma = {
      id: client.id.toString(),
      name: client.name,
      email: client.email,
      password: client.password,
      created_at: client.createdAt,
    }

    return clientPrisma
  }
}
