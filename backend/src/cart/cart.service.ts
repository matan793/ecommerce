import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { ADDRGETNETWORKPARAMS } from 'dns';

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
            where: { userId,  productId  },
            relations: ['product'],
        });

        if (cart) {
            cart.quantity += quantity;
            return await this.cartRepository.save(cart);
        } else {
            const newCart = this.cartRepository.create({ userId, product: {  productId }, quantity });
            return await this.cartRepository.save(newCart);
            // return await this.cartRepository.save(newCart);
        }
    }

    async deleteAllUserProducts(userId: number) {
        return await this.cartRepository.delete({userId})
    }

    async deleteProductFromCart(userId: number, productId: number){
        return await this.cartRepository.delete({userId, productId})
    }

}
