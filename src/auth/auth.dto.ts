import { IsEmail, IsString } from "class-validator";

export class SignInFormDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class SignUpFormDto extends SignInFormDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}