import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<string>;
    signin(dto: AuthDto): Promise<string>;
    signToken(userId: number, email: string): Promise<string>;
}
