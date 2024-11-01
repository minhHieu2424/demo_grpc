import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductModule } from './product/product.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductModule, {
    transport: Transport.GRPC,
    options: {
      package: ['product', 'category'], 
      protoPath: [
        join(__dirname, '../../../libs/proto/product.proto'),
        join(__dirname, '../../../libs/proto/category.proto')
      ],
      url: 'localhost:50051'
    }
  });
  await app.listen();
}
bootstrap();