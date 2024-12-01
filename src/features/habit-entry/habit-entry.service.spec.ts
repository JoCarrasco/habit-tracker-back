import { Test, TestingModule } from '@nestjs/testing';
import { HabitEntryService } from './habit-entry.service';

describe('HabitEntryService', () => {
  let service: HabitEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitEntryService],
    }).compile();

    service = module.get<HabitEntryService>(HabitEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
