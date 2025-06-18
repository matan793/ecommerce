import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRoles } from 'src/utils/types/userRoles';
import { ProductDTO } from 'src/utils/DTO/ProductDTO';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('products')
export class ProductsController {
    constructor(
        private productService: ProductsService,
        private cloudinaryService: CloudinaryService
    ) { }


    @Get()
    async all() {
        return await this.productService.getAll()
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard) 
    @Roles(UserRoles.admin)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: multer.memoryStorage()
        })
    )
    async createProduct(
        @UploadedFile() file: Express.Multer.File,
        @Body('product') productString: string
    ) {
        const productData: ProductDTO = JSON.parse(productString);

        if (!file) {
            throw new BadRequestException('request must contain image');
        }

        const url = await this.cloudinaryService.uploadImageFromBuffer(file);
        productData.imageUrl = url;


        return await this.productService.create(productData);
    }

    @Patch(':productId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRoles.admin)
    async editProduct(@Param('productId', ParseIntPipe) productId: number,
        @Body(new ValidationPipe()) product: ProductDTO) {
        return await this.productService.updateProduct(productId, product)
    }

    @Delete(':productId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRoles.admin)
    async deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
        return await this.productService.deleteById(productId);
    }
}
