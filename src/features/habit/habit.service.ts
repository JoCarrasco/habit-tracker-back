import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Habit, User } from '@prisma/client';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateHabitDto, UpdateHabitDto } from './habit.dto';

@Injectable()
export class HabitService {
    constructor(private readonly prismaService: PrismaService) {}
    async findOne(id: Habit['id'], userId: User['id']) {
        const habit = await this.prismaService.habit.findUnique({
            where: { id, user_id: userId },
        });

        if (!habit) {
            throw new NotFoundException();
        }

        return habit;
    }

    findAll(userId: User['id']) {
        return this.prismaService.habit.findMany(
            {
                where: { user_id: userId },
            },
        );
    }

    async create(data: CreateHabitDto, userId: User['id']) {
        const habit = await this.prismaService.habit.create({
            data: {
                ...data,
                user_id: userId,
            },
        });

        if (!habit) {
            throw new InternalServerErrorException("There was an error while creating the habit");
        }

        return habit;
    }

    async update(id: Habit['id'], data: UpdateHabitDto, userId: User['id']) {
        const habit = await this.findOne(id, userId);

        if (!habit) {
            throw new NotFoundException();
        }

        const updatedHabit = await this.prismaService.habit.update({
            where: { id, user_id: userId },
            data,
        });

        if (!updatedHabit) {
            throw new InternalServerErrorException("There was an error while updating the habit");
        }

        return updatedHabit;
    }

    async delete(id: Habit['id'], userId: User['id']) {
        const habit = await this.findOne(id, userId);

        if (!habit) {
            throw new NotFoundException();
        }

        return this.prismaService.habit.delete({
            where: { id, user_id: userId },
        });
    }
}
