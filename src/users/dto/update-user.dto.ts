import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    permissionId: number;
}
