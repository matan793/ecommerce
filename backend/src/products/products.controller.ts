import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
    constructor(
        private productService: ProductsService
    ) {}


    @Get()
    async all(){
        return await this.productService.getAll() 
    }
}
