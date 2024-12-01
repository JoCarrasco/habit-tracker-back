import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HabitModule } from './features/habit/habit.module';
import { HabitEntryModule } from './features/habit-entry/habit-entry.module';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), AuthModule, UserModule, HabitModule, HabitEntryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
