import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '../../../libs/proto/user.proto'),
      url: 'localhost:50051'
    }
  });

  await app.listen();
}
bootstrap();