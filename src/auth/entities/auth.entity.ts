import { IsEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class AuthEntity {

    @PrimaryGeneratedColumn("uuid")
    id:string

@Column({ type: 'varchar', nullable: false })
  userId: string;

    @Column({
    type: 'varchar',
    length:20,
    unique: true,
    nullable: true,
     })
     @IsEmail()
  email: string;
  
  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  phoneConfirmedAt: Date;

  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  emailConfirmedAt: Date;

   @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', nullable: true })
  userType: string;

    @Column('simple-array', { default: '' })
  roles: string[];

    @CreateDateColumn()
  createdAt: Date;
  
    @UpdateDateColumn()
  updatedAt: Date;





}
