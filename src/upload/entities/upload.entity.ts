import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UploadStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('uploads') // this tells TypeORM to map to "uploads" table
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId?: string;

  @Column({ type: 'enum', enum: UploadStatus, default: UploadStatus.PENDING })
  status: UploadStatus;

  @Column()
  externalId: string;

  @Column()
  externalPath: string;

  @Column()
  mime: string;

  @Column()
  extension: string;

  @Column({ default: true })
  active: boolean;
}
