import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProduct(data: any) {
    return this.productService.createProduct(data);
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  async updateProduct(data: { id: number; updateData: any }) {
    return this.productService.updateProduct(data.id, data.updateData);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  async deleteProduct(data: { id: number }) {
    return this.productService.deleteProduct(data.id);
  }

  @GrpcMethod('ProductService', 'GetProduct')
  async getProduct(data: { id: number }) {
    return this.productService.getProductById(data.id);
  }

  @GrpcMethod('ProductService', 'ListProducts')
  async listProducts() {
    const products = this.productService.getAllProducts();
    return { products };
  }

  

  // Category Methods
  @GrpcMethod('CategoryService', 'CreateCategory')
  async createCategory(data: { name: string }) {
    return this.productService.createCategory(data);
  }

  @GrpcMethod('CategoryService', 'UpdateCategory')
  async updateCategory(data: { id: number; name?: string }) {
    return this.productService.updateCategory(data.id, data);
  }

  @GrpcMethod('CategoryService', 'DeleteCategory')
  async deleteCategory(data: { id: number }) {
    return this.productService.deleteCategory(data.id);
  }

  @GrpcMethod('CategoryService', 'GetCategory')
  async getCategory(data: { id: number }) {
    return this.productService.getCategoryById(data.id);
  }

  @GrpcMethod('CategoryService', 'ListCategories')
  async listCategories() {
    const cate =  this.productService.getAllCategories();
    return { cate };
  }
}



