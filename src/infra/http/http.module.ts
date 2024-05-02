import { Module } from '@nestjs/common'
import { CreateClientController } from './controllers/create-client.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateClientController, AuthenticateController],
})
export class HttpModule {}
