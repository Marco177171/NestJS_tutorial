import { ForbiddenException, Injectable, Req } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class AuthService {
    constructor (private prisma: PrismaService) {}
    async signup(dto: AuthDto) {
        // generate password hash
        const hash = await argon.hash(dto.password);
        // save user in db
        try {const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
            // to only return the fields you want to see:
            // select: {
            //     id: true,
            //     email: true,
            //     createdAt: true,
            // }
        });
        // to not return the fields you don want to see (such as hash):
        delete user.hash;
        return user;
        //return 'I am signing up';
    } catch(error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Credentials Taken')
            };
        }
        throw error
        }
    }
    signin() {
        return 'I am signing in';
    }
}