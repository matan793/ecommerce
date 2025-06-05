
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { userAuth } from 'src/utils/DTO/userAuth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(userAuth: userAuth): Promise<any> {
        const user = await this.usersService.findByEmailAndPass(userAuth);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
        // const { password, ...result } = user;

        // const payload = { sub: user.userId, email: user.email };
        // return {
        //   access_token: await this.jwtService.signAsync(payload),
        // };
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
