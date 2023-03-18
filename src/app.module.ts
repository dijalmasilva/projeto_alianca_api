import { Module } from '@nestjs/common';

import { AuthModule } from '/auth/auth.module';
import { ChurchModule } from '/church/church.module';
import { DepartamentModule } from '/departament/departament.module';
import { EventModule } from '/event/event.module';
import { PersonModule } from '/person/person.module';

@Module({
  imports: [
    ChurchModule,
    PersonModule,
    AuthModule,
    DepartamentModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
