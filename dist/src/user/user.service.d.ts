import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignupDto } from './dto/Usigup.dto';
import { SignInDto } from './dto/SigninDto';
import { EMailService } from 'src/email/email.service';
import { CentralLoggerService } from 'src/utility/logger/central-logger';
export declare class UserService {
    private usersRepository;
    private readonly emailService;
    private readonly centralogger;
    constructor(usersRepository: Repository<UserEntity>, emailService: EMailService, centralogger: CentralLoggerService);
    signup(userSignupDto: UserSignupDto): Promise<UserEntity>;
    signin(signInDto: SignInDto): Promise<UserEntity>;
    create(createUserDto: CreateUserDto): string;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    update(userId: number, updateUserDto: Partial<UpdateUserDto>): Promise<string>;
    remove(id: number): string;
    FindUserByEmail(email: string): Promise<UserEntity>;
    changePassword(id: number, oldPassword: string, newpassword: string): Promise<{
        message: string;
    }>;
    accessToken(user: UserEntity): Promise<string>;
}
