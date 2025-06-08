import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Res,  } from '@nestjs/common';
import { userAuth } from 'src/utils/DTO/userAuth';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() { user }: { user: User }) {
        
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/logout')
    async logout(@Request() req) {
        return req.logout();
    }

}
