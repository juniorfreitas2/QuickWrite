import { DataSource } from 'typeorm';
import { User } from 'users/user.entity';
import { Permission } from 'permissions/permission.entity';
import { Article } from 'articles/article.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +(process.env.DATABASE_PORT || 5432),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'quickwrite',
    entities: [User, Permission, Article],
    synchronize: true,
});
