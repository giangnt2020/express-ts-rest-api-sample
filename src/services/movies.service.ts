import { EntityRepository, Repository } from "typeorm";
import { CreateMovieDto } from "@dtos/movies.dto";
import { MovieEntity } from "@entities/movies.entity";
import { HttpException } from "@exceptions/HttpException";
import { Movie } from "@interfaces/movies.interface";
import { isEmpty } from "@utils/util";
import { ActorEntity } from "@/entities/actors.entity";

@EntityRepository()
class MovieService extends Repository<MovieEntity> {
  public async findAllMovie(): Promise<Movie[]> {
    const Movies: Movie[] = await MovieEntity.find();
    return Movies;
  }

  public async findMovieById(MovieId: number): Promise<Movie> {
    if (isEmpty(MovieId)) throw new HttpException(400, "MovieId is empty");

    const findMovie: Movie = await MovieEntity.findOne({ where: { id: MovieId } });
    if (!findMovie) throw new HttpException(409, "Movie doesn't exist");

    return findMovie;
  }

  public async createMovie(movieData: CreateMovieDto): Promise<Movie> {
    if (isEmpty(movieData)) throw new HttpException(400, "movieData is empty");

    const findMovie: Movie = await MovieEntity.findOne({ where: { title: movieData.title } });
    if (findMovie) throw new HttpException(409, `This title ${movieData.title} already exists`);

    const actors: ActorEntity[] = [];
    for (let i = 0; i < movieData.actors.length; i++) {
      const actor = await ActorEntity.findOne(movieData.actors[i]);
      actors.push(actor);
    }
    const createMovieData: Movie = await MovieEntity.create({ ...movieData, actors }).save();

    return createMovieData;
  }

  public async updateMovie(MovieId: number, movieData: CreateMovieDto): Promise<Movie> {
    // if (isEmpty(movieData)) throw new HttpException(400, "movieData is empty");
    // logger.info("movieData", movieData);

    // const findMovie: Movie = await MovieEntity.findOne({ where: { id: MovieId } });
    // if (!findMovie) throw new HttpException(409, "Movie doesn't exist");

    // await MovieEntity.update(MovieId, { ...movieData, actors: findMovie.actors });

    // const updateMovie: Movie = await MovieEntity.findOne({ where: { id: MovieId } });
    // return updateMovie;
    // TODO:
    throw new HttpException(501, "Not Implemented");
  }

  public async deleteMovie(MovieId: number): Promise<Movie> {
    if (isEmpty(MovieId)) throw new HttpException(400, "MovieId is empty");

    const findMovie: Movie = await MovieEntity.findOne({ where: { id: MovieId } });
    if (!findMovie) throw new HttpException(409, "Movie doesn't exist");

    await MovieEntity.delete({ id: MovieId });
    return findMovie;
  }
}

export default MovieService;
