import { CategoryEntity } from "src/categories/entities/category.entity";
import { ReviewEntity } from "src/review/entities/review.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

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

@OneToMany(()=>ReviewEntity,(rev)=>rev.product)
reviews:ReviewEntity
}
