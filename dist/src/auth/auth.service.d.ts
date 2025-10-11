import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RecordId } from "src/types/types";
export declare class AuthService {
    private jwtservice;
    private configservice;
    constructor(jwtservice: JwtService, configservice: ConfigService);
    creatAccessToken(userId: RecordId): Promise<string>;
    generateAccessToken(payload: any, expires?: string): Promise<string>;
    verifyToken(token: string): Promise<{
        sub: RecordId;
    }>;
}
