import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JWTConstants } from '/auth/constants';
import { JwtAuthGuard } from '/guards/jwt-auth.guard';
import { RolesGuard } from '/guards/roles.guard';
import { PersonModule } from '/person/person.module';
import { PersonService } from '/person/person.service';
import { PrismaService } from '/prisma.service';
import { JwtStrategy } from '/strategies/jwt.strategy';
import { LocalStrategy } from '/strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWTConstants.secret,
      signOptions: { expiresIn: '31d' },
    }),
    PersonModule,
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    PersonService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
