import { IsNotEmpty } from "class-validator";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Movie } from "@interfaces/movies.interface";
import { ActorEntity } from "./actors.entity";

@Entity({
  name: "movies",
})
export class MovieEntity extends BaseEntity implements Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Unique(["title"])
  title: string;

  @Column()
  description: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => ActorEntity, actor => actor.movies)
  @JoinTable()
  actors: ActorEntity[];
}
