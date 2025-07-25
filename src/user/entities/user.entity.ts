import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Roles } from "src/utility/common/user-role.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:true,nullable:true})
    email:string;
    
    @Column({nullable:true})
    phone:string

    @Column({select:false})
    password:string;
    
    @Column({type:"enum",enum:Roles,array:true,default:[Roles.USER]})
    roles:Roles[]
    
    @CreateDateColumn()
    createdAt:Timestamp

    @UpdateDateColumn()
     updatedAt:Timestamp


  @OneToMany(()=>CategoryEntity,(cat)=>cat.addedBy)
  categories:CategoryEntity

    @OneToMany(()=>ProductEntity,(pro)=>pro.addedBy)
  products:ProductEntity





}

