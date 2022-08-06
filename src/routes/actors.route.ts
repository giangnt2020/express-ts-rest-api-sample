import { Router } from "express";
import ActorsController from "@controllers/actors.controller";
import { CreateActorDto } from "@dtos/actors.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";
import authMiddleware from "@middlewares/auth.middleware";

class ActorsRoute implements Routes {
  public path = "/actor";
  public router = Router();
  public ActorsController = new ActorsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.ActorsController.getActors);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.ActorsController.getActorById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateActorDto, "body"), this.ActorsController.createActor);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(CreateActorDto, "body", true), this.ActorsController.updateActor);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.ActorsController.deleteActor);
  }
}

export default ActorsRoute;
