import { Controller, Get, UseGuards, ValidationPipe, Request, Post, Body, UsePipes, Delete, ParseIntPipe, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { AddToCartDTO } from 'src/utils/DTO/addToCartDTO';
import { User } from 'src/users/users.entity';

@Controller('cart')
@UseGuards(AuthGuard('jwt'))
export class CartController {
    constructor(private cartService: CartService) { }


    @Get()
    async getCartByUserId(@Request() { user }: { user: User }) {
        return await this.cartService.getCartByUserId(user.userId);
    }

    @Post('add')
    @UsePipes(new ValidationPipe({
        whitelist: true
    }))
    @UseGuards(AuthGuard('jwt'))
    async addProductToCart(
        @Request() { user }: { user: User },
        @Body() cart: AddToCartDTO
    ) {
        return await this.cartService.addProductToCart(user.userId, cart.productId, cart.quantity);
    }

    @Delete('all')
    async deleteAll(@Request() {user}: {user: User}) {
        return await this.cartService.deleteAllUserProducts(user.userId);
    }

    @Delete(':productId')
    async deleteProductFromCart(@Request() {user}: {user: User}, @Param('productId', ParseIntPipe) productId: number){
        return await this.cartService.deleteProductFromCart(user.userId, productId);
    }

}
