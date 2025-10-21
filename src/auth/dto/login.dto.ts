import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'web.juniorfreitas@gmail.com',
        description: 'E-mail do usuário para login',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'root123',
        description: 'Senha do usuário',
    })
    @IsNotEmpty()
    password: string;
}
