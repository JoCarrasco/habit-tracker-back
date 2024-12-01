import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(id: User['id']): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });

        delete user.password;
        
        return user;
    }

    async findOneByEmail(email: User['email']): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        delete user.password;
        
        return user;
    }

    async create(data: CreateUserDto): Promise<User> {
        const user = await this.prismaService.user.create({
            data
        });

        delete user.password;
        
        return user;
    }

    update(id: User['id'], data: UpdateUserDto): Promise<User> {
        return this.prismaService.user.update({
            where: { id },
            data
        });
    }   
    
}
