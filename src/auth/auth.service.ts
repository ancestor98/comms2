import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RecordId, SecurityConfig } from "src/types/types";

@Injectable()
export class AuthService{
    constructor(
        private jwtservice:JwtService,
        private configservice:ConfigService

    ){}
// Generate access token for a specific user
    async creatAccessToken(userId:RecordId):Promise<string>{
        const payload={
            sub:userId,
        };
        return this.jwtservice.sign(payload)

    }

  // Generate access token with custom payload and optional expiry
    async generateAccessToken(payload:any,expires?:string):Promise<string>{
        const options:{expiresIn?:any}={}
        if(expires){
            options.expiresIn=expires
        }return this.jwtservice.sign(payload,options)
     }

     async verifyToken(token:string):Promise<{sub:RecordId}>{
        return await this.jwtservice.verifyAsync(token,
            {//secret: this.Configservice.get<SecurityConfig>("security").jwtSecret
                 secret: this.configservice.get<string>('ACCESS_TOKEN_SECRET_KEY'),
                }

        )

     }



}