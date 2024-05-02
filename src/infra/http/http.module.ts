import { Module } from '@nestjs/common'
import { CreateClientController } from './controllers/create-client.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateClientUseCase } from '@/domain/application/use-cases/create-client'
import { AuthenticateClientUseCase } from '@/domain/application/use-cases/authenticate-client'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateClientController, AuthenticateController],
  providers: [CreateClientUseCase, AuthenticateClientUseCase],
})
export class HttpModule {}
