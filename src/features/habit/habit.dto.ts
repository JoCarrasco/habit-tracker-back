import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateHabitDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    icon: string;
}

export class UpdateHabitDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    title: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    icon: string;
}