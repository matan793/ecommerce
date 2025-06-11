import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {

    constructor(@InjectRepository(Cart)
    private cartRepository: Repository<Cart>) { }

    async getCartByUserId(userId: number): Promise<Cart> {
        const cart = await this.cartRepository.findOne({
            where: { userId },
            relations: ['product'],
        });

        if (!cart) {
            throw new NotFoundException(`Cart for user with ID ${userId} not found`);
        }

        return cart;
    }

    async addProductToCart(userId: number, productId: number, quantity: number): Promise<Cart> {
        const cart = await this.cartRepository.findOne({
            where: { userId, productId },
        });

        if (cart) {
            cart.quantity += quantity;
            return this.cartRepository.save(cart);
        } else {
            const newCart = this.cartRepository.create({ userId, productId, quantity });
            return this.cartRepository.save(newCart);
        }
    }

}
