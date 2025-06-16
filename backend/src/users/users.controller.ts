import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { DeepPartial } from 'typeorm';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post('update')
    @HttpCode(HttpStatus.OK)
    async updateUser(
        @Request() req,
        @Body() userData: DeepPartial<User>
    ) {
        return await this.userService.saveUserByID(req.user.userId, userData);
    }
}