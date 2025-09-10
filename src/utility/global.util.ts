import { Validate } from "class-validator"
import { isValidEmail } from "./helper.util";

export function IsEmailOrPhone(validatorOptions?:any){

    return function(object:any,propertyName:string){
        Validate(
            (value:any)=>{
                if(!value) return false;
                return isValidEmail(value)||/^\+?[\d\s\-\(\)]+$/.test(value)


            },{
                message:"identifier must be a valied email or password",
                ... validatorOptions


            },

        )(object,propertyName)

    }
}



