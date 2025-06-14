import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>
    ) { }

    async findAll() {
        return await this.ordersRepository.find();
    }

    async findById(userId: number) {
        return await this.ordersRepository.find({where: {user: {userId}}});
    }

    async create(orderData: Partial<Order>): Promise<Order> {
        const order = this.ordersRepository.create(orderData);
        return await this.ordersRepository.save(order);
    }
} 
