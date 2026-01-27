import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { UsersModule } from './modules/users/users.module';
import { GatesModule } from './modules/gates/gates.module';
import { CondosModule } from './modules/condos/condos.module';

@Module({
  imports: [DatabaseModule, UsersModule, GatesModule, CondosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
