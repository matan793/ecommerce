import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DeepPartial, Repository } from 'typeorm';
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

    async create(user: DeepPartial<User>): Promise<User> {
        const newUser = this.userRepository.create(user);
        newUser.password = await bcrypt.hash(newUser.password, 10); // Hash the password before saving
        return await this.userRepository.save(newUser);
    }
}
