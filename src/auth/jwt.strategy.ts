import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import {UsersService} from "users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'mysecretjwtkey',
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findOne(payload.userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }
}
