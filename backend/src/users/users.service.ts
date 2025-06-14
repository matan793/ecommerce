import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DeepPartial, Not, Repository } from 'typeorm';
import { userAuth } from 'src/utils/DTO/userAuth';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

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
        newUser.password = await bcrypt.hash(newUser.password, 10); // Hash the password before saving
        return await this.userRepository.save(newUser);
    }

    async saveUserByID(userId: number, user: DeepPartial<User>){
        const existingUser = await this.userRepository.findOne({ where: { userId} });
        
         
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return await this.userRepository.update({userId}, user)
    }
}
 