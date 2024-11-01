import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CartModule } from './cart/cart.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CartModule, {
    transport: Transport.GRPC,
    options: {
      package: 'cart',
      protoPath: join(__dirname, '../../../libs/proto/cart.proto'),
      url: 'localhost:50051',
      loader: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
    }
  });

  await app.listen();
}
bootstrap();