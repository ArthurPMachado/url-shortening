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
import { FetchShortLinksController } from './controllers/fetch-short-links.controller'
import { FetchShortLinksUseCase } from '@/domain/application/use-cases/fetch-short-links'
import { EditShortLinkOriginalUrlController } from './controllers/edit-short-link-original-url.controller'
import { EditShortLinkOriginalUrlUseCase } from '@/domain/application/use-cases/edit-short-link-original-url'
import { DeleteShortLinkController } from './controllers/delete-short-link.controller'
import { DeleteShortLinkUseCase } from '@/domain/application/use-cases/delete-short-link'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateClientController,
    AuthenticateController,
    CreateShortLinkController,
    AccessShortLinkController,
    FetchShortLinksController,
    EditShortLinkOriginalUrlController,
    DeleteShortLinkController,
  ],
  providers: [
    CreateClientUseCase,
    AuthenticateClientUseCase,
    CreateShortLinkUseCase,
    AccessShortLinkUseCase,
    FetchShortLinksUseCase,
    EditShortLinkOriginalUrlUseCase,
    DeleteShortLinkUseCase,
  ],
})
export class HttpModule {}
