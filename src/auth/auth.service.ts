import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { SignInFormDto, SignUpFormDto } from './auth.dto';
import { UserService } from '../features/user/user.service';
import { IAuthSignInSuccessResponse, IAuthSignUpSuccessResponse, SessionPayload, SessionToken } from './auth.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import configuration from '../config/configuration';

const { bcryptSaltRounds } = configuration();

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService, 
        private readonly jwtService: JwtService,
    ) { }

    async signIn(data: SignInFormDto): Promise<IAuthSignInSuccessResponse> {
        const user = await this.userService.findOneByEmail(data.email);

        if (!user) {
            throw new UnauthorizedException();
        }

        console.log(data, user);

        const isSamePassword = await bcrypt.compare(data.password, user.password);
        
        if (!isSamePassword) {
            throw new UnauthorizedException();
        }

        delete user.password;

        return this.getAccessToken({ id: user.id, email: user.email });
    }

    async signUp(data: SignUpFormDto): Promise<IAuthSignUpSuccessResponse> {
        const { email, password } = data;
        const user = await this.userByEmail(email);
        if (user) {
            throw new ConflictException();
        }

        const encryptedPassword = await bcrypt.hash(password, parseInt(bcryptSaltRounds, 10));

        const userCreated = await this.userService.create({
            email, password: encryptedPassword
        });

        delete userCreated.password;
        
        return this.getAccessToken({ id: userCreated.id, email: userCreated.email });
    }


    async userByEmail(email: string): Promise<User | null> {
        return this.userService.findOneByEmail(email);
    }
    
    async getAccessToken(payload: SessionPayload): Promise<SessionToken> {
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
