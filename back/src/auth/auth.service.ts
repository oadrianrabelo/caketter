import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DataService } from '../PrismaClient/prisma.service';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: DataService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    try {
      const password = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          login: dto.login,
          password,
        },
      });
      return this.signToken(user.uuid, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async signIn(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        uuid: true,
        name: true,
        email: true,
        login: true,
        created_at: true,
        password: true,
      },
    });

    if (!user) throw new ForbiddenException('Incorrect email');

    const passwordMatch = await argon.verify(user.password, dto.password);

    if (!passwordMatch) throw new ForbiddenException('Invalid password');

    const { access_token } = await this.signToken(user.uuid, user.email);
    return {
      access_token,
      id: user.uuid,
      email: user.email,
      name: user.name,
      login: user.login,
      uuid: user.uuid,
    };
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
