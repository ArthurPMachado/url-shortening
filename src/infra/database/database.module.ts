import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { IClientsRepository } from '@/domain/application/repositories/clients-repository'
import { PrismaClientsRepository } from './prisma/repositories/prisma-clients-repository'
import { IShortLinksRepository } from '@/domain/application/repositories/shortLinks-repository'
import { PrismaShortLinksRepository } from './prisma/repositories/prisma-shortLinks-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: IClientsRepository,
      useClass: PrismaClientsRepository,
    },
    {
      provide: IShortLinksRepository,
      useClass: PrismaShortLinksRepository,
    },
  ],
  exports: [PrismaService, IClientsRepository],
})
export class DatabaseModule {}
