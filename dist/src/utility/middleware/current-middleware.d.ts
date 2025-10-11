import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserEntity | null;
        }
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
