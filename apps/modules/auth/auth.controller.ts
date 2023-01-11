import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(): Promise<any> {
        try {
            const res = await this.authService.login();
            return res;
        } catch (e) {
            return {
                code: 401,
                message: "Username or password isn't correct.",
            }
        }
    }
}
