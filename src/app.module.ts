import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'users/users.module';
import { PermissionsModule } from 'permissions/permissions.module';
import { BootstrapService } from 'bootstrap/bootstrap.service';
import { User } from 'users/user.entity';
import { Permission } from 'permissions/permission.entity';
import { AuthModule } from 'auth/auth.module';
import {ArticlesModule} from "articles/articles.module";
import {Article} from "articles/article.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: +process.env.DB_PORT! || 5432,
            username: process.env.DB_USER || 'quickwrite_user',
            password: process.env.DB_PASSWORD || 'quickwrite_pass',
            database: process.env.DB_NAME || 'quickwrite',
            entities: [User, Permission, Article],
            synchronize: true,
        }),
        UsersModule,
        AuthModule,
        ArticlesModule,
        PermissionsModule,
    ],
    providers: [BootstrapService],
})
export class AppModule {}
