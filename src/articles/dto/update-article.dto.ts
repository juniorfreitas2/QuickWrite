import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateArticleDto {
    @ApiProperty({ description: 'Título do artigo', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ description: 'Conteúdo do artigo', required: false })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiProperty({ description: 'ID do autor', required: false })
    @IsInt()
    @IsOptional()
    author_id?: number;
}
