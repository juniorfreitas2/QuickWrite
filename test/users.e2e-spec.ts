import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { UsersService } from 'users/users.service';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { UpdateUserDto } from 'users/dto/update-user.dto';
const request = require('supertest');

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let jwtToken: string;
    let createdUserId: number;
    const createdUserEmail: string =  'test.user3@example.com';

    const adminCredentials = { email: 'web.juniorfreitas@gmail.com', password: 'root123' };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true , transform: true}));
        await app.init();

        const loginRes = await request(app.getHttpServer())
            .post('/auth/login')
            .send(adminCredentials)
            .expect(201);

        jwtToken = loginRes.body.access_token;
    });

    afterAll(async () => {
        await app.close();
    });

    it('/users (GET) - should return 200', async () => {
        const res = await request(app.getHttpServer())
            .get('/users')
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
    });

    it('/users (POST) - should create a new user', async () => {
        const dto: CreateUserDto = {
            name: 'Test User',
            email: createdUserEmail,
            password: '123456',
            permissionId: 2, // Editor
        };

        const res = await request(app.getHttpServer())
            .post('/users')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(dto)
            .expect(201);

        expect(res.body).toHaveProperty('id');
        createdUserId = res.body.id;
    });

    it('/users/:id (GET) - should return created user', async () => {
        const res = await request(app.getHttpServer())
            .get(`/users/${createdUserId}`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(200);

        expect(res.body).toHaveProperty('email', createdUserEmail);
    });

    it('/users/:id (PUT) - should update user', async () => {
        const updateDto: UpdateUserDto = {
            name: 'Updated User',
            password: '123456',
            permissionId: 2, // Editor
        };

        const res = await request(app.getHttpServer())
            .put(`/users/${createdUserId}`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(updateDto)
            .expect(200);

        expect(res.body).toHaveProperty('name', 'Updated User');
    });

    it('/users/:id (DELETE) - should remove user', async () => {
        await request(app.getHttpServer())
            .delete(`/users/${createdUserId}`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(200);
    });
});
