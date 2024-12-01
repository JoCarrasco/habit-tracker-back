import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { HabitEntry, User } from '@prisma/client';
import { CreateHabitEntryDto, UpdateHabitEntryDto } from './habit-entry.dto';

@Injectable()
export class HabitEntryService {
    constructor(private readonly prismaService: PrismaService) { }

    findOne(id: HabitEntry['id'], userId: User['id']) {
        return this.prismaService.habitEntry.findUnique({
            where: {
                id, habit: {
                    user_id: userId
                }
            },
        });
    }

    findAll(userId: User['id']) {
        return this.prismaService.habitEntry.findMany({
            where: {
                habit: {
                    user_id: userId
                }
            },
        });
    }

    async create(data: CreateHabitEntryDto, userId: User['id']) {
        const { habitId, date } = data;
        const habit = await this.prismaService.habit.findUnique({
            where: { id: habitId, user_id: userId },
        });

        if (!habit) {
            throw new NotFoundException("Target habit not found while creating entry");
        }

        return this.prismaService.habitEntry.create({
            data: {
                habit: {
                    connect: { id: habitId },
                },
                date,
            }
        });
    }

    async update(id: HabitEntry['id'], data: UpdateHabitEntryDto, userId: User['id']) {
        const entry = await this.findOne(id, userId);

        if (!entry) {
            throw new NotFoundException();
        }

        return this.prismaService.habitEntry.update({
            where: { id },
            data,
        });
    }

    async delete(id: HabitEntry['id'], userId: User['id']) {
        const entry = await this.findOne(id, userId);

        if (!entry) {
            throw new NotFoundException();
        }

        return this.prismaService.habitEntry.delete({
            where: { id },
        });
    }
}
