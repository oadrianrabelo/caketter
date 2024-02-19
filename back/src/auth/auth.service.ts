import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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

  private readonly logger = new Logger(AuthService.name);

  async signUp(dto: AuthDto) {
    this.logger.log('Criando usuário...');
    try {
      if (dto.password.length < 8) {
        this.logger.error('Falha ao criar usuário');
        throw new ForbiddenException(
          'A senha deve conter pelo menos 8 caracteres',
        );
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
      if (!passwordRegex.test(dto.password)) {
        throw new ForbiddenException(
          'A senha deve conter letras maiúsculas, minúsculas e caracteres especiais',
        );
      }

      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (existingUser) {
        throw new ForbiddenException('O e-mail já está em uso');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(dto.email)) {
        throw new ForbiddenException('Formato de e-mail inválido');
      }
      const password = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          login: dto.login,
          password,
        },
      });

      this.logger.log(
        `Usuário ${user.name} criado com sucesso às ${user.created_at}`,
      );
      this.logger.verbose(
        `Usuário ${user.name} criado com sucesso às ${user.created_at}`,
      );
      return this.signToken(user.uuid, user.email);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Usuário já está em uso, tente outro e-mail',
          );
        }
      }
      throw new InternalServerErrorException('Falha ao criar usuário');
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
    this.logger.log(`Fazendo login para usuário ${user.name}`);

    if (!user) throw new ForbiddenException('Email inválido');

    const passwordMatch = await argon.verify(user.password, dto.password);

    if (!passwordMatch) throw new ForbiddenException('Senha inválida');

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

    if (!secret) {
      throw new ForbiddenException('Configuração JWT_SECRET ausente');
    }

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
