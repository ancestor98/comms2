import { HttpStatus } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
export declare function findOneOrThrow<T>(repo: Repository<T>, where: FindOptionsWhere<T>, relations?: string[], select?: (keyof T)[], errorMessage?: string, exceptionStatus?: HttpStatus): Promise<T>;
