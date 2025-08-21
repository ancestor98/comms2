import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/Usigup.dto';
import { UserEntity } from './entities/user.entity';
import { SignInDto } from './dto/SigninDto';
import { ChangePasswordDto } from './dto/changass.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(userSignup: UserSignupDto): Promise<{
        user: UserEntity;
    }>;
    signin(signInDto: SignInDto): Promise<{
        user: {
            user: UserEntity;
            accessToken: string;
        };
    }>;
    findAll(): Promise<{
        users: UserEntity[];
    }>;
    findOne(id: string): Promise<UserEntity>;
    changePassWord(id: number, changePassWord: ChangePasswordDto): Promise<{
        message: string;
    }>;
    update(userId: string, body: any, updateUserDto: UpdateUserDto): Promise<string>;
    remove(id: string): string;
    getProfile(currentUser: UserEntity): UserEntity;
}
