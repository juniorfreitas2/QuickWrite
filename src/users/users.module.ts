import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { PermissionsModule } from 'permissions/permissions.module';
import { UsersController } from './users.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => PermissionsModule),
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [
        UsersService,
        TypeOrmModule.forFeature([User])
    ],
})
export class UsersModule {}
