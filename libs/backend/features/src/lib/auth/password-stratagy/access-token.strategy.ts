import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt";
import { environment } from '@avans-nx-workshop/shared/util-env';

interface JwtPayload{
    sub: string;
    role: string;
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: environment.JWT_ACCESS_TOKEN_SECRET,
        });
    }

    validate(payload: JwtPayload){
        return payload
    }
}