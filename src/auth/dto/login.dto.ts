import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        example: 'web.juniorfreitas@gmail.com',
        description: 'E-mail do usuário para login',
    })
    email: string;

    @ApiProperty({
        example: 'root123',
        description: 'Senha do usuário',
    })
    password: string;
}
