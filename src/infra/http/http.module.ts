import { Module } from '@nestjs/common'
import { CreateClientController } from './controllers/create-client.controller'
import { AuthenticateController } from './controllers/authenticate.controller'

@Module({
  controllers: [CreateClientController, AuthenticateController],
})
export class HttpModule {}
