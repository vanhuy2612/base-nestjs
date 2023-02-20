import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { LoginRequestBody } from './auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(
        @Body() params: LoginRequestBody,
    ): Promise<any> {
        try {
            const res = await this.authService.login(params);
            return res;
        } catch (e) {
            console.log(e);
            return {
                code: 401,
                message: "Username or password isn't correct.",
            }
        }
    }
}
