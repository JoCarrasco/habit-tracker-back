import { Body, Controller, Get, Param, Post, Put, Req, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

    @Get(':id')
    findOne(@Param('id') id: User['id'], @Req() req: any) {
        const { user } = req;
        if (user.id !== id) {
            throw new UnauthorizedException();
        }
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: User['id'], @Body(new ValidationPipe()) updateUserDto: UpdateUserDto, @Req() req: any) {
        const { user } = req;
        if (user.id !== id) {
            throw new UnauthorizedException();
        }
        return this.userService.update(id, updateUserDto);
    }
}
