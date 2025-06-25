
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstant } from '../../SECRET/secret';
import { Request } from 'express';
import { JwtPayload } from 'src/utils/types/jwtPayload';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService,) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors(
        [
          JwtStrategy.extractJWT,
          ExtractJwt.fromAuthHeaderAsBearerToken()
        ]
      ),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<{ userId: number }> {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }


  private static extractJWT(req: Request): string | null {
  if (req.cookies && 'access_token' in req.cookies && req.cookies.access_token.length > 0) {
    return req.cookies.access_token;
  }
  return null;
}
}
