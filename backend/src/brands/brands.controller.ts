import { Controller, Get } from '@nestjs/common';
import { Brand } from './brand.entity';
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {

    constructor(private readonly brandsService: BrandsService) {}
    
    @Get()
    async findAll(): Promise<Brand[]> {
      return await this.brandsService.findAll();
    }
}
