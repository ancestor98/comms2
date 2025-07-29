import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/Usigup.dto';
import { UserEntity } from './entities/user.entity';
import { SignInDto } from './dto/SigninDto';
import { ChangePasswordDto } from './dto/changass.dto';
import { CurrentUser } from 'src/utility/decorators/current-userdecorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guards';
import { AllowedRoles } from 'src/utility/decorators/allowed-roles.decorator';
import { Roles } from 'src/utility/common/user-role.enum';
import { AllowedGuard } from 'src/utility/guards/allowed.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
 @Post("signup")
   async signup(@Body() userSignup:UserSignupDto):Promise<{user:UserEntity}> {
    return {user:await this.userService.signup(userSignup)}
  }
  
  
  @Post("signin")
 async signin(@Body()signInDto : SignInDto):Promise<{user:{user:UserEntity,accessToken:string}
 }> {
    const user= await this.userService.signin(signInDto)
    const accessToken= await this.userService.accessToken(user);
    
    return {user:{ accessToken,user }}
  }
//@AllowedRoles(Roles.ADMIN)
@UseGuards(AuthenticationGuard,AllowedGuard([Roles.ADMIN]))
  @Get("all")
 async findAll(): Promise<{ users: UserEntity[] }> {
  const users = await this.userService.findAll();
  return { users };
}

  @Get('single/:id')
async findOne(@Param('id') id: string): Promise<UserEntity> {
  return this.userService.findOne(+id);
}

@Patch(':id/change-password')
async changePassWord(@Param("id", ParseIntPipe)id:number,@Body() changePassWord :ChangePasswordDto):Promise<{  message: string }>{

 return await this.userService.changePassword(id,
  changePassWord.oldPassword,
  changePassWord.newPassword)

 
 

}


 @Patch(':userId')
update(@Param('userId') userId: string, @Body() body, @Body() updateUserDto: UpdateUserDto) {
  console.log('Raw body:', body); // <-- should NOT be empty
  console.log('Parsed DTO:', updateUserDto);
  return this.userService.update(+userId, updateUserDto);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
    
  }

@UseGuards(AuthenticationGuard)
  @Get("me")
  getProfile(@CurrentUser()currentUser:UserEntity){
    return currentUser
  }
}
