import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private permissionsRepo: Repository<Permission>,
    ) {}

    async findAll(): Promise<Permission[]> {
        return this.permissionsRepo.find();
    }

    async findOne(id: number): Promise<Permission> {
        const perm = await this.permissionsRepo.findOne({ where: { id } });
        if (!perm) throw new NotFoundException('Permission not found');
        return perm;
    }

    async create(name: string, description: string): Promise<Permission> {
        const perm = this.permissionsRepo.create({ name, description });
        return this.permissionsRepo.save(perm);
    }

    async remove(id: number): Promise<void> {
        const perm = await this.findOne(id);
        await this.permissionsRepo.remove(perm);
    }
}
