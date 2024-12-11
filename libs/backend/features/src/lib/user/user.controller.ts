import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiResponseInterface, CreateUserInterface, LoginDataInterface, UserInterface } from '@avans-nx-workshop/shared/interfaces';
import { UserExistGuard } from './user-exists.guard';
import { defer, Observable, of } from 'rxjs';
import { UserDto} from '@avans-nx-workshop/backend/dto'

@Controller('user')
export class UserController {
    private readonly logger: Logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Observable<ApiResponse<UserInterface[] | UserInterface>> {
        return defer(() => this.userService.findAll());
    }

    // this method should precede the general getOne method, otherwise it never matches
    // @Get('self')
    // getSelf(@InjectToken() token: Token): Observable<ApiResponseInterface<User[] | User>> {
    //     return defer(() => this.userService.findOne(token.id));
    // }
    // async getSelf(@InjectToken() token: Token): Promise<IUser> {
    //     const result = await this.userService.getOne(token.id);
    //     return result;
    // }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<ApiResponseInterface<UserInterface[] | UserInterface>> {
        return defer(() => this.userService.findOne(id));
    }

    @Post('')
    // @UseGuards(UserExistGuard)
    create(@Body() user: UserDto): Observable<ApiResponseInterface<UserInterface[] | UserInterface>> {
        return defer(() => this.userService.create(user));
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() user: CreateUserInterface
    ): Observable<ApiResponseInterface<UserInterface[] | UserInterface>> {
        return defer(() => this.userService.update(id, user));
    }

    @Put(':id')
    login(@Body() login: LoginDataInterface): Observable<ApiResponseInterface<UserInterface[] | UserInterface>> {
        return defer(() => this.userService.login(login));
    }
}
