import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  state: string;

  @Column()
  initial_date: string;

  @Column()
  final_date: string;

  @Column()
  id_team: number;

  @Column()
  email: string;

}