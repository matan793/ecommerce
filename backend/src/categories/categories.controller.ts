import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private categorieService: CategoriesService) { }

    @Get()
    async findAll() {
        return await this.categorieService.findAll();
    }
}
