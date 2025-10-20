import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';
import { UsersModule } from 'users/users.module';
import {PermissionsController} from "permissions/permissions.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Permission]),
        forwardRef(() => UsersModule),
    ],
    providers: [PermissionsService],
    controllers:[PermissionsController],
    exports: [
        PermissionsService,
        TypeOrmModule.forFeature([Permission])
    ],
})
export class PermissionsModule {}
