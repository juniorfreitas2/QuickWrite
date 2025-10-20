import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    @Get()
    @ApiOperation({ summary: 'Listar todos as permissões' })
    @ApiResponse({ status: 200, description: 'Lista de permissões retornada com sucesso.' })
    async findAll() {
        return this.permissionsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obter permissão por ID' })
    @ApiResponse({ status: 200, description: 'Permissão retornada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Permissão não encontrada.' })
    async findOne(@Param('id') id: number) {
        return this.permissionsService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Criar nova permissão' })
    @ApiResponse({ status: 201, description: 'Permissão criada com sucesso.' })
    async create(
        @Body() body: { name: string; description: string },
    ) {
        return this.permissionsService.create(body.name, body.description);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover permissão' })
    async remove(@Param('id') id: number) {
        return this.permissionsService.remove(id);
    }
}
