import { Module } from '@nestjs/common';
import { ClientsModule, Transport, ClientProviderOptions } from '@nestjs/microservices';
import { join } from 'path';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../../libs/proto/user.proto'),
          url: 'localhost:50051'
        }
      } as ClientProviderOptions 
    ])
  ],
  controllers: [UserController]
})
export class UserModule {}
