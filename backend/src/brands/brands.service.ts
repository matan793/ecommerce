import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';

@Injectable()
export class BrandsService {
    constructor(@InjectRepository(Brand)
    private brandRepository: Repository<Brand>) { }

    async findAll(): Promise<Brand[]> {
        return await this.brandRepository.find();
    }
}
