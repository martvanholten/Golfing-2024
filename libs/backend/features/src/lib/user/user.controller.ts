import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Logger,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiResponseInterface, CreateUserInterface, LoginDataInterface, UserInterface, UserInterfaceResponse } from '@avans-nx-workshop/shared/interfaces';
import { UserExistGuard } from './user-exists.guard';
import { defer, Observable, of } from 'rxjs';
import { UpdateUserDto, UserDto} from '@avans-nx-workshop/backend/dto'
import { AccessTokenGuard } from '@avans-nx-workshop/backend/features';

@Controller('user')
export class UserController {
    private readonly logger: Logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Observable<ApiResponse<UserInterfaceResponse[]>> {
        this.logger.log('get users reached')
        return defer(() => this.userService.findAll());
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<ApiResponseInterface<UserInterfaceResponse>> {
        return defer(() => this.userService.findOne(id));
    }

    @Post('')
    create(@Body() user: UserDto): Observable<ApiResponseInterface<UserInterfaceResponse>> {
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
    ): Observable<ApiResponseInterface<UserInterfaceResponse>> {
        return defer(() => this.userService.update(id, user));
    }

    @Delete()
    @UseGuards(AccessTokenGuard)
    delete(
        @Body() user: UserInterface
    ): Observable<ApiResponseInterface<UserInterfaceResponse>> {
        return defer(() => this.userService.delete(user));
    }
}

