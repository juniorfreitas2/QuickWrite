import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { UpdateUserDto } from 'users/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Permission } from 'permissions/permission.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
        @InjectRepository(Permission)
        private permissionsRepo: Repository<Permission>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.usersRepo.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepo.findOne({ where: { email } });
    }

    async create(data: CreateUserDto): Promise<User> {
        const permission = await this.permissionsRepo.findOne({ where: { id: data.permissionId } });
        if (!permission) throw new NotFoundException('Permission not found');

        const hashed = await bcrypt.hash(data.password, 10);
        const user = this.usersRepo.create({ ...data, password: hashed, permission });
        return this.usersRepo.save(user);
    }

    async update(id: number, data: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);

        if (data.permissionId) {
            const permission = await this.permissionsRepo.findOne({ where: { id: data.permissionId } });
            if (!permission) throw new NotFoundException('Permission not found');
            user.permission = permission;
        }

        if (data.password) {
            user.password = await bcrypt.hash(data.password, 10);
        }

        Object.assign(user, { ...data, password: user.password });
        return this.usersRepo.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.usersRepo.remove(user);
    }
}
