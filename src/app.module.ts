import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'users/users.module';
import { PermissionsModule } from 'permissions/permissions.module';
import { BootstrapService } from 'bootstrap/bootstrap.service';
import { User } from 'users/user.entity';
import { Permission } from 'permissions/permission.entity';
import { AuthModule } from 'auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT!,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User, Permission],
            synchronize: true,
        }),
        UsersModule,
        AuthModule,
        PermissionsModule,
    ],
    providers: [BootstrapService],
})
export class AppModule {}
