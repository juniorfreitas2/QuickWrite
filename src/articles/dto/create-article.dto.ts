import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateArticleDto {
    @ApiProperty({ description: 'Título do artigo' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Conteúdo do artigo' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: 'ID do autor', required: false })
    @IsInt()
    @IsOptional()
    author_id?: number;
}
