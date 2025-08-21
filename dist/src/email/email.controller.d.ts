import { EMailService } from './email.service';
import { SendEmailDto } from './dto/email.dto';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EMailService);
    SendMail(sendEmaildto: SendEmailDto): Promise<{
        message: string;
    }>;
}
