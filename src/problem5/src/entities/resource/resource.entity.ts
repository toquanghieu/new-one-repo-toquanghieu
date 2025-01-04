import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { provideSingleton } from "../../middlewares/inversify/util";

@Entity('resources')
@provideSingleton(Resource)
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({length: 200})
  name: string

  @Column({length: 500})
  description: string

  @Column()
  status: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}