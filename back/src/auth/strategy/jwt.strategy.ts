import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { DataService } from '../../PrismaClient/prisma.service';
import * as _ from 'lodash';

@Injectable({})
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: DataService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const userWithoutPassword = _.omit(user, 'password');

      return userWithoutPassword;
    } catch (error) {
      throw new Error(`Erro ao validar usuário: ${error.message}`);
    }
  }
}
