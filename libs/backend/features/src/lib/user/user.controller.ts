import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiResponseInterface, LoginDataInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { defer, Observable, of } from 'rxjs';
import { UpdateUserDto, UserDto } from '@avans-nx-workshop/backend/dto'
import { AccessTokenGuard } from '../auth/guard/access-token.guard';

@Controller('user')
export class UserController {
    private readonly logger: Logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Observable<ApiResponse<UserInterface[]>> {
        this.logger.log('get users reached')
        return defer(() => this.userService.findAll());
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<ApiResponseInterface<UserInterface>> {
        return defer(() => this.userService.findOne(id));
    }

    @Get('email/:email')
    findOneByEmail(@Param('email') email: string): Observable<ApiResponseInterface<UserInterface>> {
        return defer(() => this.userService.findOneByEmail(email));
    }

    @Post('')
    create(@Body() user: UserDto): Observable<ApiResponseInterface<UserInterface>> {
        return defer(() => this.userService.create(user));
    }

    @Put('login')
    login(@Body() login: LoginDataInterface): Observable<ApiResponseInterface<UserInterface>> {
        return defer(() => this.userService.login(login));
    }

    @Put(':id')
    @UseGuards(AccessTokenGuard)
    update(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ): Observable<ApiResponseInterface<UserInterface>> {
        return defer(() => this.userService.update(id, user));
    }

    @Delete()
    @UseGuards(AccessTokenGuard)
    delete(
        @Body() user: UserInterface
    ): Observable<ApiResponseInterface<UserInterface>> {
        return defer(() => this.userService.delete(user));
    }
}

