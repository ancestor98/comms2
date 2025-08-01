import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class ReviewEntity{

@PrimaryGeneratedColumn()
id:number

@Column()
ratings:string

@Column()
comment:string;
 

@CreateDateColumn()
CreatedAt:Timestamp

@UpdateDateColumn()
updatedAt:Timestamp

@ManyToOne(()=>UserEntity,(user)=>user.reviwe)
user:UserEntity

@ManyToOne(()=>ProductEntity,(pro)=>pro.reviews)
product:ProductEntity


}
