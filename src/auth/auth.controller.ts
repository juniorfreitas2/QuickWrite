import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'users/users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @Post('login')
    @ApiOperation({ summary: 'Login do usuário' })
    @ApiResponse({ status: 200, description: 'Login bem-sucedido, retorna JWT.' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
    @ApiBody({ type: LoginDto })
    async login(@Body() body: LoginDto) {
        const user = await this.usersService.findByEmail(body.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const valid = await this.authService.validateUser(body.email, body.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        return this.authService.login(user);
    }
}
