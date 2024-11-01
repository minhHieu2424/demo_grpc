import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductController } from './product/product.controller';
import { CartController } from './cart/cart.controller';
import { OrderController } from './order/order.controller';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [UserModule, CartModule,ProductModule],
  controllers: [AppController, UserController, ProductController, CartController, OrderController],
  providers: [AppService],
})
export class AppModule {}
