import { BaseEvent } from "./base.event";
export type UserRegisterPayload = {
  email: string;
  subject: string;
  text: string;
  html: string;
timestamp:Date,
};

export const EMAIL_ACTIVITY_TRIGGERD='action.email.triggered';

export class ActivityEmailTriggergEvent extends BaseEvent< UserRegisterPayload>{}