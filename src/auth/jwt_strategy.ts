import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: { id: string }, req: Request) {
        const { id } = payload;

        const user = await this.userModel.findById(id);

        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        req.user = user._id;
        // req.user = user;

        return user;
    }
}
