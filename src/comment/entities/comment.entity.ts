import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorEmail: string;

  @Column()
  comment: string;

  @Column()
  id_task: number;
}