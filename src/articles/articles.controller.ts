import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Req,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { RolesGuard } from 'auth/roles.guard';
import { Roles } from 'auth/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './article.entity';

@ApiTags('Articles')
@ApiBearerAuth()
@Controller('articles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    @Roles('Admin', 'Editor', 'Reader')
    @ApiOperation({ summary: 'List all articles' })
    @ApiResponse({ status: 200, description: 'Articles retrieved successfully.' })
    findAll() {
        return this.articlesService.findAll();
    }

    @Get(':id')
    @Roles('Admin', 'Editor', 'Reader')
    @ApiOperation({ summary: 'Get article by ID' })
    @ApiResponse({ status: 200, description: 'Article retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Article not found.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.articlesService.findOne(id);
    }

    @Post()
    @Roles('Admin', 'Editor')
    @ApiOperation({ summary: 'Create a new article' })
    @ApiResponse({ status: 201, description: 'Article created successfully.' })
    @ApiBody({ type: CreateArticleDto })
    create(@Body() dto: CreateArticleDto, @Req() req: any) {
        dto.author_id = req.user.userId;
        return this.articlesService.create(dto);
    }

    @Put(':id')
    @Roles('Admin', 'Editor')
    @ApiOperation({ summary: 'Update an article by ID' })
    @ApiResponse({ status: 200, description: 'Article updated successfully.' })
    @ApiResponse({ status: 404, description: 'Article not found.' })
    @ApiBody({ type: UpdateArticleDto })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateArticleDto) {
        return this.articlesService.update(id, dto);
    }

    @Delete(':id')
    @Roles('Admin', 'Editor')
    @ApiOperation({ summary: 'Delete an article by ID' })
    @ApiResponse({ status: 200, description: 'Article deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Article not found.' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.articlesService.remove(id);
    }
}
