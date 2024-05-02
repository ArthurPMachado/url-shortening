import { IClientsRepository } from '@/domain/application/repositories/clients-repository'
import { Client } from '@/domain/enterprise/entities/client'
import { PrismaService } from '../prisma.service'
import { PrismaClientMapper } from '../mappers/prisma-client-mapper'

export class PrismaClientsRepository implements IClientsRepository {
  constructor(private prisma: PrismaService) {}

  async create(client: Client): Promise<void> {
    const data = PrismaClientMapper.toPrisma(client)

    await this.prisma.client.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = await this.prisma.client.findFirst({
      where: {
        email,
      },
    })

    if (!client) {
      return null
    }

    return PrismaClientMapper.toDomain(client)
  }
}
