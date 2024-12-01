import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { HabitEntryService } from './habit-entry.service';
import { CreateHabitEntryDto, UpdateHabitEntryDto } from './habit-entry.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { HabitEntry } from '@prisma/client';

@Controller('habit-entry')
export class HabitEntryController {
    constructor(private readonly habitEntryService: HabitEntryService) {}

    @HttpCode(201)
    @Post()
    create(@Req() req: any, @Body(new ValidationPipe()) data: CreateHabitEntryDto) {
        const { user } = req;   
        return this.habitEntryService.create(data, user.id);
    }

    @HttpCode(200)
    @Get()
    findAll(@Req() req: any) {
        const { user } = req;
        return this.habitEntryService.findAll(user.id);
    }

    @HttpCode(200)
    @Get(':id')
    findOne(@Param('id') id: HabitEntry['id'], @Req() req: any) {
        const { user } = req;
        return this.habitEntryService.findOne(id, user.id);
    }

    @HttpCode(200)
    @Put(':id')
    update(@Param('id') id: HabitEntry['id'], @Req() req: any, @Body(new ValidationPipe()) data: UpdateHabitEntryDto) {
        const { user } = req;
        return this.habitEntryService.update(id, data, user.id);
    }

    @HttpCode(200)
    @Delete(':id')
    delete(@Param('id') id: HabitEntry['id'], @Req() req: any) {
        const { user } = req;
        return this.habitEntryService.delete(id, user.id);
    }
}
