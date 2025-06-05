import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { userAuth } from 'src/utils/DTO/userAuth';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findByEmailAndPass(userAuth: userAuth): Promise<User | null> {
        return await this.userRepository.findOne({ where: userAuth })
    }
}
