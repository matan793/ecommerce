import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDTO } from 'src/utils/DTO/ProductDTO';
import { Brand } from 'src/brands/brand.entity';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async getAll(): Promise<Product[]> {
        return await this.productRepository.find({ relations: ['brand', 'category'] });
    }

    async findById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { productId: id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async deleteById(productId: number) {
        return await this.productRepository.delete({ productId })
    }

    async updateProduct(productId: number, productData: ProductDTO): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { productId },  relations: ['brand', 'category']  });
        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }

        product.brand = { brandId: productData.brandId } as Brand;
        product.category = { categoryId: productData.categoryId } as Category;

        Object.assign(product, productData);
        return await this.productRepository.save(product);
    }

    async create(productData: ProductDTO): Promise<Product> {
        const product = this.productRepository.create({
            ...productData,
            brand: { brandId: productData.brandId } as Brand,
            category: { categoryId: productData.categoryId } as Category,
        });
        console.log("saving", product);
        
        return await this.productRepository.save(product);
    }
}
 