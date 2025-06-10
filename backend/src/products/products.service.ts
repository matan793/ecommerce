import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}

    async getAll(): Promise<Product[]>{
        return await this.productRepository.find({relations: ['brand']});
    }

    async findById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { productId: id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
}
