import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    async getAllUsers(): Promise<any> {
        const results = await this.userService.findAll();
        return results;
    }
}