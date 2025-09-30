import { HttpException, HttpStatus } from "@nestjs/common";
import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";

export async function findOneOrThrow<T>(
    repo:Repository<T>,
    where:FindOptionsWhere<T>,
    relations?:string[],
    select?:(keyof T)[],
    errorMessage?:string,
    exceptionStatus?:HttpStatus,
):Promise<T>{
    const findOptions: FindOneOptions<T> = { where };

    if (select) findOptions.select = select as (keyof T)[];
    if (relations) findOptions.relations = relations;


        const record = await repo.findOne(findOptions); 

            if(!record){
                throw new HttpException(
                    errorMessage??" record not found",
                    exceptionStatus?? HttpStatus.BAD_REQUEST
                )
            }
            return record
    }