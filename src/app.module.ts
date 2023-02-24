import { Module } from '@nestjs/common';
import { PersonService } from './person/person.service';
import { PersonController } from './person/person.controller';
import { RoleController } from './role/role.controller';
import { DepartamentController } from './departament/departament.controller';
import { DepartamentService } from './departament/departament.service';
import { EventService } from './event/event.service';
import { EventController } from './event/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/person/entity/person.entity';
import { Departament } from 'src/departament/entity/departament.entity';
import { Event } from 'src/event/entity/event.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { Auth } from 'src/auth/entity/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/constants/jwt.constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { LocalStrategy } from 'src/auth/local.strategy';
import { AppController } from 'src/app.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '31d' },
    }),
    TypeOrmModule.forFeature([Person, Departament, Event, Auth]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123456',
      database: 'projeto-alianca',
      entities: [Person, Departament, Event, Auth],
      synchronize: true,
    }),
  ],
  controllers: [
    PersonController,
    RoleController,
    DepartamentController,
    EventController,
    AuthController,
    AppController,
  ],
  providers: [
    PersonService,
    DepartamentService,
    EventService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
