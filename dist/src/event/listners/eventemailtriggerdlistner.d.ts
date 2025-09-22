import { EMailService } from "src/email/email.service";
import { CentralLoggerService } from "src/utility/logger/central-logger";
import { ActivityEmailTriggergEvent } from "./emailtrigger";
export declare class EmailTriggerdEvent {
    private readonly centralLogger;
    private readonly emailService;
    constructor(centralLogger: CentralLoggerService, emailService: EMailService);
    handleEmailSend(event: ActivityEmailTriggergEvent): Promise<void>;
}
