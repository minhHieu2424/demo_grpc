import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CartService } from './cart.service';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @GrpcMethod('CartService', 'GetCart')
  async getCart(data: { userId: number }) {
    return this.cartService.getCart(data.userId);
  }

  @GrpcMethod('CartService', 'AddToCart')
  async addToCart(data: { userId: number; productId: number; quantity: number }) {
    return this.cartService.addToCart(data.userId, data.productId, data.quantity);
  }

  @GrpcMethod('CartService', 'RemoveFromCart')
  async removeFromCart(data: { userId: number; productId: number; quantity: number }) {
    return this.cartService.removeFromCart(data.userId, data.productId, data.quantity);
  }
}