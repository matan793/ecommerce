import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>
    ) { }

    async findAll() {

        const orders = await this.ordersRepository.find({ relations: ['user', 'address', 'items', 'payments'] });
        return orders.map(order => {
            if (order.user) {
                const { password, role, googleId, address, ...userWithoutPassword } = order.user;
                return { ...order, user: userWithoutPassword };
            }
            return order;
        });
    }

    async findById(userId: number) {
        return await this.ordersRepository.find({ where: { user: { userId } } });
    }

    async create(orderData: Partial<Order>): Promise<Order> {
        const order = this.ordersRepository.create(orderData);
        return await this.ordersRepository.save(order);
    }

    async salesAmount() {
        return await this.ordersRepository.sum('totalAmount');
    }
    async countOrdersInMonth(year: number, month: number): Promise<number> {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        return await this.ordersRepository.count({
            where: {
                createdAt: Between(startDate, endDate),
            },
        });
    }

    async salesInMonth(year: number, month: number): Promise<number> {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const sum = await this.ordersRepository.sum('totalAmount', {
            createdAt: Between(startDate, endDate),
        });
        return sum ?? 0;
    }

    async salesThisYear(year: number) {
        const rawResults = await this.ordersRepository
            .createQueryBuilder('order')
            .select("TO_CHAR(order.createdAt, 'YYYY-MM')", 'month')
            .addSelect('COUNT(*)', 'orderCount')
            .where('EXTRACT(YEAR FROM order.createdAt) = :year', { year })
            .groupBy("TO_CHAR(order.createdAt, 'YYYY-MM')")
            .orderBy('month')
            .getRawMany();

        const allMonths = Array.from({ length: 12 }, (_, i) => {
            const month = (i + 1).toString().padStart(2, '0');
            return `${year}-${month}`;
        });

        const finalResults = allMonths.map((month) => {
            const found = rawResults.find((r) => r.month === month);
            return {
                month,
                orderCount: found ? parseInt(found.orderCount, 10) : 0,
            };
        });

        return finalResults;
    }

} 
