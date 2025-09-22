import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EMailService } from "src/email/email.service";
import { CentralLoggerService } from "src/utility/logger/central-logger";
import { ActivityEmailTriggergEvent, EMAIL_ACTIVITY_TRIGGERD } from "./emailtrigger";

@Injectable()
export class EmailTriggerdEvent{
    constructor(
        private readonly centralLogger:CentralLoggerService,
        private readonly emailService:EMailService
    ){}
    @OnEvent(EMAIL_ACTIVITY_TRIGGERD)
    async handleEmailSend(event:ActivityEmailTriggergEvent){
        const payload= event.toJSON()
        await this.emailService.sendMail({
    recipient: payload.email,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
    timestamp: new Date(),

  
        
        } )
        console.log('✅ Email sent via listener:', payload.subject);

        this.centralLogger.logBusinessLogic('email sent via listner',{
            email:payload.email,
            subject:payload.subject,
            timestamp: new Date().toISOString(),
        })
        

}
  
}

