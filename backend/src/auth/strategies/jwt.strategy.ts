
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstant } from '../../SECRET/secret';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
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

  async validate(payload: any) {
    return { userId: payload.sub };
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'user_token' in req.cookies && req.cookies.user_token.length > 0) {
      return req.cookies.user_token;
    }
    return null;
  }
}
