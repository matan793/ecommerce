
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { userAuth } from 'src/utils/DTO/userAuth';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { OAuth2Client } from 'google-auth-library';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    private client = new OAuth2Client('396064184331-89oe1f3pak830r7k1q1ief38n16eftvd.apps.googleusercontent.com');

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


    async validateGoogleToken(token: string) {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: '396064184331-89oe1f3pak830r7k1q1ief38n16eftvd.apps.googleusercontent.com',
        });

        const payload = ticket.getPayload();
        if (!payload) {
            throw new UnauthorizedException('Invalid Google token payload');
        }
        const { sub: googleId, email, name, picture, family_name } = payload;

        let user = await this.usersService.findByGoogleId(googleId);
        
        if (!user) {
            const partialUser: DeepPartial<User> = {
                googleId,
                firstName: name,
                lastName: family_name,
                email
            } 
            user = await this.usersService.create(partialUser);
        }

        const jwt = this.jwtService.sign({ userId: user.userId });
        return { token: jwt, user };
    }

}
