import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export interface AppTokenAttributes{
  id:string;
  identifierId:string;
  identifierType:string;
  purpose: string;
  token?: string;
  code?:string;
  expiresBy: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
export type CreateAppTokenParams= Omit<
AppTokenAttributes,"id"|"createdAt"|"updatedAt"
>
export type UpdateAppTokenParams = Omit<AppTokenAttributes, 'id'>;
@Entity("apptokens")
export class AppToken{
    @PrimaryGeneratedColumn("uuid")
    id:string;
    
    @Column()
    identifierId:string

     @Column()
    identifierType:string

    @Column()
     purpose:string

     @Column({nullable:true})
     token?:string

    @Column({nullable:true})
    code?:string
    
     @Column()
     expiresBy:Date

     @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date


    
}