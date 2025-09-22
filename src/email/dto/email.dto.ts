import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail({},{each:true})
 recipient: string[] | string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsOptional()
  @IsString()
  html?: string;

@IsOptional()
@IsString()
 timestamp?: Date;
}
