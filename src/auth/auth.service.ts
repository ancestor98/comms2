// import { Injectable } from '@nestjs/common';
// //import { CreateAuthDto } from './dto/validators';
// import { UpdateAuthDto } from './dto/update-auth.dto';
// import { isValidEmail } from 'src/utility/helper.util';
// import dayjs, { Dayjs } from 'dayjs';
// import { normalizePhoneNumber } from 'src/utility/phone.util';

// @Injectable()
// export class AuthService {

//   async forgotPassword(identifier: string) {
//     try{
//       const key= isValidEmail(identifier)?"email":"phone"
//       //Normalize phone number if it phone
//       let normalizedidentifier= identifier
//       if(key ==="phone"){
//           const startTime = dayjs().valueOf();
//           try{
//             normalizedidentifier= normalizePhoneNumber(identifier)
//             const duration= dayjs.valueOf()-startTime;
//             await this
//           }

//       }
//     }
//     return 'This action adds a new auth';
//   }

//   findAll() {
//     return `This action returns all auth`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} auth`;
//   }

//   update(id: number, updateAuthDto: UpdateAuthDto) {
//     return `This action updates a #${id} auth`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} auth`;
//   }
// }
