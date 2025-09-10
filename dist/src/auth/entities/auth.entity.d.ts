export declare class AuthEntity {
    id: string;
    userId: string;
    email: string;
    phone: string;
    phoneConfirmedAt: Date;
    emailConfirmedAt: Date;
    password: string;
    userType: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
}
