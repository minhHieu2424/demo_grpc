import { Controller, Get, Post, Body, Param, Delete, Put, Query, Inject, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface ProductService {
    createProduct(data: { name: string; price: number; stock: number; description: string; categoryId: number }): Observable<any>;
    updateProduct(data: { id: number; name?: string; price?: number; stock?: number; description?: string; categoryId?: number }): Observable<any>;
    deleteProduct(data: { id: number }): Observable<any>;
    getProduct(data: { id: number }): Observable<any>;
    listProducts(data: {}): Observable<{ products : any[] }>;
}

interface CategoryService {
    createCategory(data: { name: string; description?: string }): Observable<any>;
    updateCategory(data: { id: number; name?: string; description?: string }): Observable<any>;
    deleteCategory(data: { id: number }): Observable<any>;
    getCategory(data: { id: number }): Observable<any>;
    listCategories(data: {}): Observable<{ cates : any[] }>;
}

@Controller('product')
export class ProductController implements OnModuleInit {
    private productService: ProductService;
    private categoryService: CategoryService;

    constructor(
        @Inject('PRODUCT_SERVICE') private productClient: ClientGrpc,
        @Inject('CATEGORY_SERVICE') private categoryClient: ClientGrpc,
    ) { }

    onModuleInit() {
        this.productService = this.productClient.getService<ProductService>('ProductService');
        this.categoryService = this.categoryClient.getService<CategoryService>('CategoryService');
    }

    @Post()
    createProduct(@Body() body: { name: string; price: number; stock: number; description: string; categoryId: number }) {
        return this.productService.createProduct(body);
    }

    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() body: { name?: string; price?: number; stock?: number; description?: string; categoryId?: number }) {
        return this.productService.updateProduct({ id, ...body });
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct({ id });
    }

    @Get(':id')
    getProduct(@Param('id') id: number) {
        return this.productService.getProduct({ id });
    }

    @Get()
    listProducts() {

        return this.productService.listProducts({});
    }

    @Post('category') 
    createCategory(@Body() body: { name: string; description?: string }) {
        return this.categoryService.createCategory(body);
    }

    @Put('category/:id') 
    updateCategory(@Param('id') id: number, @Body() body: { name?: string; description?: string }) {
        return this.categoryService.updateCategory({ id, ...body });
    }

    @Delete('category/:id')
    deleteCategory(@Param('id') id: number) {
        return this.categoryService.deleteCategory({ id });
    }

    @Get('category/:id') 
    getCategory(@Param('id') id: number) {
        return this.categoryService.getCategory({ id });
    }

    @Get('category') 
    listCategories() {
        return this.categoryService.listCategories({});
    }
}
