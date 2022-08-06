import { IsNotEmpty } from "class-validator";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { Actor } from "@interfaces/actors.interface";
import { MovieEntity } from "./movies.entity";

@Entity({
  name: "actors",
})
export class ActorEntity extends BaseEntity implements Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Unique(["name"])
  name: string;

  @Column()
  @IsNotEmpty()
  age: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => MovieEntity, movie => movie.actors)
  movies: MovieEntity[];
}
