export interface AppTokenAttributes {
    id: string;
    identifierId: string;
    identifierType: string;
    purpose: string;
    token?: string;
    code?: string;
    expiresBy: Date | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}
export type CreateAppTokenParams = Omit<AppTokenAttributes, "id" | "createdAt" | "updatedAt">;
export type UpdateAppTokenParams = Omit<AppTokenAttributes, 'id'>;
export declare class AppToken {
    id: string;
    identifierId: string;
    identifierType: string;
    purpose: string;
    token?: string;
    code?: string;
    expiresBy: Date;
    createdAt: Date;
    updatedAt: Date;
}
