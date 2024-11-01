import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/cart';

@Injectable()
export class CartService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }


  async getCart(userId: number) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: true
      }
    });

    if (!cart) {
      cart = await this.createCart(userId);
    }

    return {
      id: cart.id,
      userId: cart.userId,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
      status: cart.status,
      cartItems: cart.cartItems.map(item => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity
      }))
    };
  }

  async createCart(userId: number) {
    return this.prisma.cart.create({
      data: {
        userId,
        totalItems: 0,
        totalPrice: 0,
        status: 'CTT'
      },
      include: {
        cartItems: true
      }
    });
  }

  async addToCart(userId: number, productId: number, quantity: number) {
    let cart = await this.getCart(userId);
    
    if (!cart) {
      cart = await this.createCart(userId);
    }

    try {
      const existingCartItem = await this.prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId
        }
      });

      if (existingCartItem) {
        // Update existing cart item
        await this.prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: { 
            quantity: existingCartItem.quantity + quantity 
          }
        });
      } else {
        // Create new cart item
        await this.prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity
          }
        });
      }

      // Get updated cart
      const updatedCart = await this.prisma.cart.findUnique({
        where: { id: cart.id },
        include: {
          cartItems: true
        }
      });

      // Calculate new totals
      const totalItems = updatedCart.cartItems.reduce((sum, item) => sum + item.quantity, 0);

      // Update cart totals
      const finalCart = await this.prisma.cart.update({
        where: { id: cart.id },
        data: {
          totalItems,
          status: 'CTT'
        },
        include: {
          cartItems: true
        }
      });

      return {
        id: finalCart.id,
        userId: finalCart.userId,
        totalItems: finalCart.totalItems,
        totalPrice: finalCart.totalPrice,
        status: finalCart.status,
        cartItems: finalCart.cartItems.map(item => ({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity
        }))
      };
    } catch (error) {
      throw new Error(`Failed to add item to cart: ${error.message}`);
    }
  }


  async removeFromCart(userId: number, productId: number, quantity: number) {
    const cart = await this.getCart(userId);
    if (!cart) return null;

    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId
      }
    });

    if (cartItem) {
      if (cartItem.quantity <= quantity) {
        await this.prisma.cartItem.delete({
          where: { id: cartItem.id }
        });
      } else {
        await this.prisma.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: cartItem.quantity - quantity }
        });
      }
    }

    return this.getCart(userId);
  }
}