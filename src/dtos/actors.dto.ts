import { IsNumber, IsString } from "class-validator";

export class CreateActorDto {
  @IsString()
  public name: string;

  @IsNumber()
  public age: number;
}
