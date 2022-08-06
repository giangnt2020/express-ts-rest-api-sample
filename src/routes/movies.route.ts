import { Router } from "express";
import MoviesController from "@controllers/movies.controller";
import { CreateMovieDto } from "@dtos/movies.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";
import authMiddleware from "@middlewares/auth.middleware";

class MoviesRoute implements Routes {
  public path = "/movie";
  public router = Router();
  public MoviesController = new MoviesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.MoviesController.getMovies);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.MoviesController.getMovieById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateMovieDto, "body"), this.MoviesController.createMovie);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(CreateMovieDto, "body", true), this.MoviesController.updateMovie);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.MoviesController.deleteMovie);
  }
}

export default MoviesRoute;
