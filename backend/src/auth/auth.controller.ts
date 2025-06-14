import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Res, Get, UsePipes, ValidationPipe, } from '@nestjs/common';
import { userAuth, UserRegisterDTO } from 'src/utils/DTO/userAuth';
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
    @HttpCode(HttpStatus.OK)
    async login(@Request() { user }: { user: User }, @Res({ passthrough: true }) response: Response) {

        response.cookie('access_token', (await this.authService.login(user)).access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });
        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Res({ passthrough: true }) response: Response) {
        response.cookie('access_token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(0)
        });
        return { message: 'Logout successful' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('user')
    @HttpCode(HttpStatus.OK)
    async getUser(@Request() { user }: { user: User }) {

        const { role: __, password: _, ...safeUser } = await this.userService.findById(user.userId);
        return safeUser;
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({
        whitelist: true,
    }))
    async register(@Body() userAuth: UserRegisterDTO, @Res({ passthrough: true }) response: Response) {
        const user = await this.userService.findByEmailAndPass(userAuth);
        if (user) {
            response.status(HttpStatus.BAD_REQUEST).send({ message: 'Registration failed' });
            return;
        }
        const newUser = await this.userService.create(userAuth);

        // response.cookie('access_token', (await this.authService.login(newUser)).access_token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'strict',
        //     maxAge: 3600000 // 1 hour
        // });
        return { message: 'Registration successful' };
    }

}
