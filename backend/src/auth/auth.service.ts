
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { userAuth } from 'src/utils/DTO/userAuth';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(userAuth: userAuth): Promise<User> {
        const user = await this.usersService.findByEmailAndPass(userAuth);
        if (!user) {
            throw new UnauthorizedException();
        }
        

        return user;
    }

    async login(user: User) {
        const payload = { sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    

}
