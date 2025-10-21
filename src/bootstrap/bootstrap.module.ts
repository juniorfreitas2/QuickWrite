import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BootstrapService } from './bootstrap.service';
import { Permission } from 'permissions/permission.entity';
import { User } from 'users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Permission, User])],
    providers: [BootstrapService],
    exports: [BootstrapService],
})
export class BootstrapModule {}
