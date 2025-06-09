
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
    console.log('JWT Payload:', payload);
    
    return { userId: payload.sub };
  }

  private static extractJWT(req: Request): string | null {
    console.log(req.cookies.access_token)
    if (req.cookies && 'access_token' in req.cookies && req.cookies.access_token.length > 0) {
      return req.cookies.access_token;
    }
    return null;
  }
}
