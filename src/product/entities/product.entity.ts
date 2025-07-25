import { CategoryEntity } from "src/categories/entities/category.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:"products"})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    tittle:string

    @Column()
    description:string

    @Column({type:'decimal',precision:10,scale:2,default:0})
    price:number

     @Column()
    stock:number

     @Column("simple-array")
    images:string[]

    @CreateDateColumn()
    createdAt:Timestamp


    @UpdateDateColumn()
    updateDate:Timestamp


@ManyToOne(()=>UserEntity,(us)=>us.products)
addedBy:UserEntity

@ManyToOne(()=>CategoryEntity,(cat)=>cat.products)
category:CategoryEntity
}
