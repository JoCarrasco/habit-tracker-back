import { Body, Controller, Post } from '@nestjs/common';
import { SignInFormDto, SignUpFormDto } from './auth.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in')
  async signIn(@Body(new ValidationPipe()) data: SignInFormDto): Promise<any> {
    return this.authService.signIn(data);
  }

  @Public()
  @Post('sign-up')
  async signUp(@Body(new ValidationPipe()) data: SignUpFormDto): Promise<any> {
    return this.authService.signUp(data);
  } 
}
