import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Res, } from '@nestjs/common';
import { userAuth } from 'src/utils/DTO/userAuth';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.entity';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() { user }: { user: User }, @Res({ passthrough: true }) response: Response) {

        response.cookie('access_token', (await this.authService.login(user)).access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });
        return user;
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.cookie('access_token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(0)
        });
        return { message: 'Logout successful' };
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() userAuth: userAuth, @Res({ passthrough: true }) response: Response) {
        const user = await this.userService.findByEmailAndPass(userAuth);
        if (user) {
            response.status(HttpStatus.BAD_REQUEST).send({ message: 'Registration failed' });
            return;
        }
        const newUser = await this.userService.create(userAuth);
        console.log(newUser);
        
        response.cookie('access_token', (await this.authService.login(newUser)).access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });
        return { message: 'Registration successful' };
    }

}
