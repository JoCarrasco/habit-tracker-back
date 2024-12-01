import { Module } from '@nestjs/common';
import { HabitEntryController } from './habit-entry.controller';
import { HabitEntryService } from './habit-entry.service';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HabitEntryController],
  providers: [HabitEntryService]
})
export class HabitEntryModule {}
