import { Actor } from "./actors.interface";

export interface Movie {
  id: number;
  title: string;
  description: string;
  actors: Actor[];
}
