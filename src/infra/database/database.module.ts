import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { IClientsRepository } from '@/domain/application/repositories/clients-repository'
import { PrismaClientsRepository } from './prisma/repositories/prisma-clients-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: IClientsRepository,
      useClass: PrismaClientsRepository,
    },
  ],
  exports: [PrismaService, IClientsRepository],
})
export class DatabaseModule {}
