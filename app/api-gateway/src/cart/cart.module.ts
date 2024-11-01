import { Module } from '@nestjs/common';
import { ClientsModule, Transport, ClientProviderOptions } from '@nestjs/microservices';
import { join } from 'path';
import { CartController } from './cart.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CART_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'cart',
          protoPath: join(__dirname, '../../../libs/proto/cart.proto'),
          url: 'localhost:50051'
        }
      } as ClientProviderOptions 
    ])
  ],
  controllers: [CartController]
})
export class CartModule {}
