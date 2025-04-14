import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserModel, UserDocument } from '../../user/user.schema';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'

@Injectable()
export class UserRoleGuard implements CanActivate {
    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
        private reflector: Reflector
    ) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        const role = context.switchToHttp().getRequest().headers.userRole;
        if(role){
            return roles.includes(role)
        }
        return false
    }
}