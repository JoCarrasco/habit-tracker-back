import { Test, TestingModule } from '@nestjs/testing';
import { HabitEntryController } from './habit-entry.controller';

describe('HabitEntryController', () => {
  let controller: HabitEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitEntryController],
    }).compile();

    controller = module.get<HabitEntryController>(HabitEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
