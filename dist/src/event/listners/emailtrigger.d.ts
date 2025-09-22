import { BaseEvent } from "./base.event";
export type UserRegisterPayload = {
    email: string;
    subject: string;
    text: string;
    html: string;
    timestamp: Date;
};
export declare const EMAIL_ACTIVITY_TRIGGERD = "action.email.triggered";
export declare class ActivityEmailTriggergEvent extends BaseEvent<UserRegisterPayload> {
}
