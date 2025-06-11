import { Controller, Get, UseGuards, ValidationPipe, Request, Post, Body, UsePipes } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { AddToCartDTO } from 'src/utils/DTO/addToCartDTO';

@Controller('cart')
@UseGuards(AuthGuard('jwt'))
export class CartController {
    constructor(private cartService: CartService) { }


    @Get()
    async getCartByUserId(@Request() { userId }: { userId: number }) {
        return await this.cartService.getCartByUserId(userId);
    }

    @Post('add')
    @UsePipes(new ValidationPipe({
        whitelist: true}))
    async addProductToCart(
        @Request() { userId }: { userId: number },
        @Body() cart: AddToCartDTO
    ) {
        return await this.cartService.addProductToCart(userId, cart.productId, cart.quantity);
    }
}
  