import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Permission } from '../permissions/permission.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepo: Repository<User>,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user) return null;
        const match = await bcrypt.compare(pass, user.password);
        if (match) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = {
            userId: user.id,
            email: user.email,
            permission: user.permission?.name || 'Reader',
        };
        return { access_token: this.jwtService.sign(payload) };
    }
}
