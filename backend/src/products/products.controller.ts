import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get()
    all(){
        return 'products'
    }
}
