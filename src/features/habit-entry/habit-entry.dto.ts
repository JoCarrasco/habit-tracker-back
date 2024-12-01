import { IsDateString, IsString } from "class-validator";

export class CreateHabitEntryDto {
    @IsDateString()  
    date: Date;

    @IsString()
    habitId: string;
}

export class UpdateHabitEntryDto {
    @IsDateString()
    date: Date;
}