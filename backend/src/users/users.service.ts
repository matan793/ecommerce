import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DeepPartial, Not, Repository } from 'typeorm';
import { userAuth } from 'src/utils/DTO/userAuth';
import { Address } from 'src/addresses/addresses.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findByGoogleId(googleId: string) {
        return this.userRepository.findOne({ where: { googleId } })
    }

    async findByEmailAndPass(userAuth: userAuth): Promise<User | null> {

        const user = await this.userRepository.findOne({ where: { email: userAuth.email } })
        if (user && await bcrypt.compare(userAuth.password, user.password)) {
            return user;
        }

        return null;
    }
    async findById(id: number): Promise<User> {
        // const user = await this.userRepository.findOne({ where: { userId: id }, relations: ['cart'] });
        const user = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.cart', 'cart')
            .leftJoinAndSelect('cart.product', 'product')
            .leftJoinAndSelect('product.brand', 'brand ')
            .leftJoinAndSelect('user.address', 'address')
            .where('user.userId = :id', { id })
            .getOne();


        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async create(user: DeepPartial<User>): Promise<User> {
        const newUser = this.userRepository.create(user);
        if (newUser.password) {
            newUser.password = await bcrypt.hash(newUser.password, 10);
        }
        return await this.userRepository.save(newUser);
    }

    async saveUserByID(userId: number, userData: DeepPartial<User>) {
        const user = await this.findById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        // Handle address separately
        if (userData.address) {
            const addressRepository = this.userRepository.manager.getRepository(Address);
            if (user.address) {
                // Update existing address
                await addressRepository.update(user.address.addressId, userData.address);
            } else {
                const newAddress = addressRepository.create(userData.address);
                const savedAddress: Address = await addressRepository.save(newAddress);
                user.address = savedAddress;
            }
            delete userData.address; // Remove address from userData
        }

        // Update user properties
        Object.assign(user, userData);
        user.userId = userId;
        return await this.userRepository.save(user);
    }
}
