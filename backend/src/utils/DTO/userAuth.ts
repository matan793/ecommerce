import { Optional } from '@nestjs/common';
import { Allow, IsDate, IsInt, IsString, Min } from 'class-validator';

export interface userAuth{
    email: string;
    password: string;
}

export class UserRegisterDTO {
    @IsString({ message: 'Email must be a string' })
    email: string;
    @IsString({ message: 'Password must be a string' })
    password: string;
    @IsString({ message: 'First name must be a string' })
    firstName: string;
    @IsString({ message: 'Last name must be a string' })
    lastName: string;
    @Allow()
    birthdate: Date;
    
    phoneNumber: string;
}