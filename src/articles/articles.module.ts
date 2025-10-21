import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './article.entity';
import { UsersModule } from 'users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Article]), UsersModule],
    providers: [ArticlesService],
    controllers: [ArticlesController],
    exports: [ArticlesService],
})
export class ArticlesModule {}
