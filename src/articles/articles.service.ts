import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { User } from 'users/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private articlesRepo: Repository<Article>,
    ) {}

    async findAll(): Promise<Article[]> {
        return this.articlesRepo.find({ relations: ['author'] });
    }

    async findOne(id: number): Promise<Article> {
        const article = await this.articlesRepo.findOne({ where: { id }, relations: ['author'] });
        if (!article) throw new NotFoundException('Article not found');
        return article;
    }

    async create(dto: CreateArticleDto, user?: User): Promise<Article> {
        const article = this.articlesRepo.create({
            title: dto.title,
            content: dto.content,
            author: { id: dto.author_id } as User,
        });
        return this.articlesRepo.save(article);
    }

    async update(id: number, dto: UpdateArticleDto): Promise<Article> {
        const article = await this.findOne(id);

        if (dto.title !== undefined) article.title = dto.title;
        if (dto.content !== undefined) article.content = dto.content;

        return this.articlesRepo.save(article);
    }

    async remove(id: number): Promise<void> {
        const article = await this.findOne(id);
        await this.articlesRepo.remove(article);
    }
}
