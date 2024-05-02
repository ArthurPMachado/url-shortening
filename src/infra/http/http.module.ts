import { Module } from '@nestjs/common'
import { CreateClientController } from './controllers/create-client.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateClientUseCase } from '@/domain/application/use-cases/create-client'
import { AuthenticateClientUseCase } from '@/domain/application/use-cases/authenticate-client'
import { CreateShortLinkController } from './controllers/create-short-link.controller'
import { AccessShortLinkUseCase } from '@/domain/application/use-cases/access-short-link'
import { CreateShortLinkUseCase } from '@/domain/application/use-cases/create-short-link'
import { AccessShortLinkController } from './controllers/access-short-link.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateClientController,
    AuthenticateController,
    CreateShortLinkController,
    AccessShortLinkController,
  ],
  providers: [
    CreateClientUseCase,
    AuthenticateClientUseCase,
    CreateShortLinkUseCase,
    AccessShortLinkUseCase,
  ],
})
export class HttpModule {}
