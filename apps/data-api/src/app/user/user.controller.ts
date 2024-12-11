import { Controller, Get } from "@nestjs/common";
import { UserRepo } from "./user.repo";
import { User } from "./user.schema";

@Controller('user')
export class UserController{
    constructor(private readonly userRepo: UserRepo){}

    @Get()
    async getUsers(): Promise<User[]>{
        return this.userRepo.find();
    }
}