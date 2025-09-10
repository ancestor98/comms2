import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  IsIn,
} from 'class-validator';
import { IsEmailOrPhone } from 'src/utility/global.util';

export class ForgotPsswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmailOrPhone()
  identifier:string
}
