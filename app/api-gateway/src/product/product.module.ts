import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductController } from './product.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(__dirname, '../../../libs/proto/product.proto'),
          url: 'localhost:50051',
        },
      },
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'category', 
          protoPath: join(__dirname, '../../../libs/proto/category.proto'),
          url: 'localhost:50051',
        },
      },
    ])
  ],
  controllers: [ProductController]
})
export class ProductModule {}
