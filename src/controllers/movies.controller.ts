import { NextFunction, Request, Response } from "express";
import { CreateMovieDto } from "@dtos/movies.dto";
import { Movie } from "@interfaces/movies.interface";
import MovieService from "@services/movies.service";

class MoviesController {
  public MovieService = new MovieService();

  public getMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMoviesData: Movie[] = await this.MovieService.findAllMovie();

      res.status(200).json({ data: findAllMoviesData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getMovieById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const MovieId = Number(req.params.id);
      const findOneMovieData: Movie = await this.MovieService.findMovieById(MovieId);

      res.status(200).json({ data: findOneMovieData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const movieData: CreateMovieDto = req.body;
      const createMovieData: Movie = await this.MovieService.createMovie(movieData);

      res.status(201).json({ data: createMovieData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const MovieId = Number(req.params.id);
      const MovieData: CreateMovieDto = req.body;
      const updateMovieData: Movie = await this.MovieService.updateMovie(MovieId, MovieData);

      res.status(200).json({ data: updateMovieData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const MovieId = Number(req.params.id);
      const deleteMovieData: Movie = await this.MovieService.deleteMovie(MovieId);

      res.status(200).json({ data: deleteMovieData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default MoviesController;
