import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.entity';
import { Order } from './orders.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRoles } from 'src/utils/types/userRoles';

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
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRoles.admin)
    async findById(@Request() {user}: {user: User}) {
        return await this.ordersService.findById(user.userId);
    }

    @Post('place')
    async placeOrder(@Body() order: Partial<Order>) {
        return await this.ordersService.create(order)
    }
}
