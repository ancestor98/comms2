import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/email.dto';
export declare class EMailService {
    private readonly configService;
    private transporter;
    constructor(configService: ConfigService);
    sendMail(dto: SendEmailDto): Promise<boolean>;
}
