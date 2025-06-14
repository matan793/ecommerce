import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.entity';
import { Order } from './orders.entity';

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersController {
    constructor(private ordersService: OrdersService) {

    }
    @Get('all')
    async findAll() {
        return await this.ordersService.findAll()
    }

    @Get()
    async findById(@Request() {user}: {user: User}) {
        return await this.ordersService.findById(user.userId);
    }

    @Post('place')
    async placeOrder(@Body() order: Partial<Order>) {
        return await this.ordersService.create(order)
    }
}
