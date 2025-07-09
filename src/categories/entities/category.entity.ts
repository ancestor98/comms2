import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { UserController } from "src/user/user.controller";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
    @Entity({name:"categories"})
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id:number;
   @Column()
   title:string

   @Column()
    description:string

   @CreateDateColumn()
     createdAt:Timestamp

   @UpdateDateColumn()
   upDatedAt:Timestamp

   @ManyToOne(()=>UserEntity,(user)=>user.categories)
   addedBy:UserEntity

   @OneToMany(()=>ProductEntity,(pro)=>pro.category)
   products:ProductEntity[];

}
