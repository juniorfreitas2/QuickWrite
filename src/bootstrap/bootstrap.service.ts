import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from 'permissions/permission.entity';
import { User } from 'users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BootstrapService {
    private readonly logger = new Logger(BootstrapService.name);

    constructor(
        @InjectRepository(Permission)
        private permissionsRepo: Repository<Permission>,
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) {}

    async init() {
        await this.seedPermissions();
        await this.seedRootUser();
    }

    private async seedPermissions() {
        const permissions = [
            { name: 'Admin', description: 'Pode gerenciar usuários e artigos' },
            { name: 'Editor', description: 'Pode gerenciar apenas artigos' },
            { name: 'Reader', description: 'Pode apenas ler artigos' },
        ];

        for (const perm of permissions) {
            const exists = await this.permissionsRepo.findOne({ where: { name: perm.name } });
            if (!exists) {
                await this.permissionsRepo.save(this.permissionsRepo.create(perm));
                this.logger.log(`Permissão criada: ${perm.name}`);
            }
        }
    }

    private async seedRootUser() {
        const rootEmail = 'web.juniorfreitas@gmail.com';
        const rootPassword = 'root123';
        const existing = await this.usersRepo.findOne({ where: { email: rootEmail } });

        if (!existing) {
            const adminPerm = await this.permissionsRepo.findOne({ where: { name: 'Admin' } });
            const hashed = await bcrypt.hash(rootPassword, 10);

            if (!adminPerm) {
                throw new Error('Permissão Admin não encontrada. Seed falhou.');
            }

            const user = this.usersRepo.create({
                name: 'Root',
                email: rootEmail,
                password: hashed,
                permission: adminPerm,
            });

            await this.usersRepo.save(user);
            this.logger.log(`Usuário root criado: ${rootEmail}`);
        } else {
            this.logger.log(`Usuário root já existe: ${rootEmail}`);
        }
    }
}
