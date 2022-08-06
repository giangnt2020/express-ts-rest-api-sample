import { NextFunction, Request, Response } from "express";
import { CreateActorDto } from "@dtos/actors.dto";
import { Actor } from "@interfaces/actors.interface";
import ActorService from "@services/actors.service";

class ActorsController {
  public ActorService = new ActorService();

  public getActors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllActorsData: Actor[] = await this.ActorService.findAllActor();

      res.status(200).json({ data: findAllActorsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getActorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ActorId = Number(req.params.id);
      const findOneActorData: Actor = await this.ActorService.findActorById(ActorId);

      res.status(200).json({ data: findOneActorData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createActor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ActorData: CreateActorDto = req.body;
      const createActorData: Actor = await this.ActorService.createActor(ActorData);

      res.status(201).json({ data: createActorData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateActor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ActorId = Number(req.params.id);
      const ActorData: CreateActorDto = req.body;
      const updateActorData: Actor = await this.ActorService.updateActor(ActorId, ActorData);

      res.status(200).json({ data: updateActorData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteActor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ActorId = Number(req.params.id);
      const deleteActorData: Actor = await this.ActorService.deleteActor(ActorId);

      res.status(200).json({ data: deleteActorData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default ActorsController;
