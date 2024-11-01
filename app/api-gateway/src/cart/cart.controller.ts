import { Controller, Get, Post, Delete, Body, Param, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

// Define interfaces based on proto
interface Cart {
  id: number;
  userId: number;
  totalItems: number;
  totalPrice: number;
  cartItems: CartItem[];
}

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartService {
  GetCart(data: { userId: number }): Observable<Cart>;
  AddToCart(data: { 
    userId: number;
    productId: number;
    quantity: number;
  }): Observable<Cart>;
  RemoveFromCart(data: {
    userId: number;
  }): Observable<Cart>;
}

@Controller('cart')
export class CartController {
  private cartService: CartService;

  constructor(
    @Inject('CART_SERVICE') private client: ClientGrpc
  ) {}

  onModuleInit() {
    this.cartService = this.client.getService<CartService>('CartService');
  }

  @Get(':userId')
  getCart(@Param('userId') userId: number) {
    return this.cartService.GetCart({ userId });
  }

  @Post(':userId')
  addToCart(
    @Param('userId') userId: number,
    @Body() body: {
      productId: number;
      quantity: number;
    }
  ) {
    return this.cartService.AddToCart({
      userId,
      productId: body.productId,
      quantity: body.quantity
    });
  }

  @Delete(':userId')
  removeFromCart(
    @Param('userId') userId: number,
  ) {
    return this.cartService.RemoveFromCart({
        userId
    });
  }
}