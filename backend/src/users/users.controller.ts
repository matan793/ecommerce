import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { DeepPartial } from 'typeorm';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private userService: UsersService){}
    @Post('update')
    async updateUser (@Req() {userId}: {userId: number},@Body() user: DeepPartial<User>) {
        return await this.userService.saveUserByID(userId, user)
    }
}
