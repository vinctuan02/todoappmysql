
import { Exclude } from 'class-transformer'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string

  @Column({ type: 'varchar', length: 255 })
  first_name: string

  @Column({ type: 'varchar', length: 255 })
  last_name: string

  @Column({ type: 'varchar', length: 255, unique: true })
  phone_number: string

  @Column({ type: 'varchar', length: 50, default: 'user' })
  role: string

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date

  @Column({type: 'varchar', nullable: true})
  profile_picture: string
}