
import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


declare  global{
    namespace Express{
        interface Request{
            currentUser?:UserEntity|null
        }
    }
}



@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private readonly userService:UserService,
        private readonly authService:AuthService

    ){}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers['authorization'];
 if(!authHeaders || isArray(authHeaders )   || !authHeaders.startsWith('Bearer ')){
        req.currentUser=null
        return next()
         }
const token= authHeaders.split(' ')[1]
         try{
              //const {id}=<JwtPayload>verify(token,process.env.ACCESS_TOKEN_SECRET_KEY)
              //if it dosnt work come here
              const payload= await this.authService.verifyToken(token)
        //const payload = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) as JwtPayload;

             const currentUser=  await this.userService.findOne(+payload.sub) //(+payload.id)
             req.currentUser= currentUser ?? null

               }catch(err){
                 req.currentUser=null
        } next()
        }
  
  }

interface JwtPayload{
    id:string
}
