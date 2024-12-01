import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { HabitService } from './habit.service';
import { Habit } from '@prisma/client';
import { CreateHabitDto, UpdateHabitDto } from './habit.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';

@Controller('habit')
export class HabitController {
    constructor(private readonly habitService: HabitService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Req() req: any) {
        const { user } = req;
        return this.habitService.findAll(user.id);
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findOne(@Param('id') id: Habit['id'], @Req() req: any) {
        const { user } = req;
        return this.habitService.findOne(id, user.id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Req() req: any, @Body(new ValidationPipe()) data: CreateHabitDto) {
        const { user } = req;
        return this.habitService.create(data, user.id);
    }

    @Put(':id')
    update(@Param('id') id: Habit['id'], @Req() req: any, @Body(new ValidationPipe()) data: UpdateHabitDto) {
        const { user } = req;
        return this.habitService.update(id, data, user.id);
    }

    @Delete(':id')
    delete(@Param('id') id: Habit['id'], @Req() req: any) {
        const { user } = req;
        return this.habitService.delete(id, user.id);
    }
}
