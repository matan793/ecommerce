
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { userAuth } from 'src/utils/DTO/userAuth';
import { User } from 'src/users/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'email'});
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.signIn({email, password});
    if (!user) {
      throw new UnauthorizedException(); 
    }
    return user;
  }
}
