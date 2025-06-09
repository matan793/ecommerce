
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/users/users.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<DeepPartial<User>> {
    const user = await this.authService.signIn({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    const { role: __, password: _, ...safeUser } = user;
    return safeUser;
  }
}