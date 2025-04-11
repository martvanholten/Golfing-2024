import { Injectable, Logger } from '@nestjs/common';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);

    constructor(private readonly userRepo: UserRepo) {}

    async findAll(): Promise<any> {
        this.logger.log('findAll users');
        return await this.userRepo.getCount()
    }
}
