import { IsArray, IsString } from "class-validator";

export class CreateMovieDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsArray()
  public actors: number[];
}

export class UpdateMovieDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;
}
