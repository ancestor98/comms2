import { GenderUser } from "src/utility/common/user-role.enum";
export declare class UserSignupDto {
    name: string;
    email: string;
    phone: string;
    gender: GenderUser;
    password: string;
}
