import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRoles } from 'src/utils/types/userRoles';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminController {
    @Get('dashboard')
    @Roles(UserRoles.admin)
    getAdminDashboard() {
        return { message: 'Welcome, Admin!' };
    }
}