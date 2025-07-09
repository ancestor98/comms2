import { Body, Controller, Post } from '@nestjs/common';
import { EMailService } from './email.service';
import { SendEmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EMailService) {}
  
  @Post("send")
  async SendMail(@Body()sendEmaildto:SendEmailDto){

    await this.emailService.sendMail(sendEmaildto)

    return{message:'email succsesfully sent'}

  }





}
