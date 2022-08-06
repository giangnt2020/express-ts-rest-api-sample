import { EntityRepository, Repository } from "typeorm";
import { CreateActorDto } from "@dtos/actors.dto";
import { ActorEntity } from "@entities/actors.entity";
import { HttpException } from "@exceptions/HttpException";
import { Actor } from "@interfaces/actors.interface";
import { isEmpty } from "@utils/util";

@EntityRepository()
class ActorService extends Repository<ActorEntity> {
  public async findAllActor(): Promise<Actor[]> {
    const Actors: Actor[] = await ActorEntity.find();
    return Actors;
  }

  public async findActorById(ActorId: number): Promise<Actor> {
    if (isEmpty(ActorId)) throw new HttpException(400, "ActorId is empty");

    const findActor: Actor = await ActorEntity.findOne({ where: { id: ActorId } });
    if (!findActor) throw new HttpException(409, "Actor doesn't exist");

    return findActor;
  }

  public async createActor(ActorData: CreateActorDto): Promise<Actor> {
    if (isEmpty(ActorData)) throw new HttpException(400, "ActorData is empty");

    const findActor: Actor = await ActorEntity.findOne({ where: { name: ActorData.name } });
    if (findActor) throw new HttpException(409, `This name ${ActorData.name} already exists`);

    const createActorData: Actor = await ActorEntity.create(ActorData).save();

    return createActorData;
  }

  public async updateActor(ActorId: number, ActorData: CreateActorDto): Promise<Actor> {
    if (isEmpty(ActorData)) throw new HttpException(400, "ActorData is empty");

    const findActor: Actor = await ActorEntity.findOne({ where: { id: ActorId } });
    if (!findActor) throw new HttpException(409, "Actor doesn't exist");

    await ActorEntity.update(ActorId, ActorData);

    const updateActor: Actor = await ActorEntity.findOne({ where: { id: ActorId } });
    return updateActor;
  }

  public async deleteActor(ActorId: number): Promise<Actor> {
    if (isEmpty(ActorId)) throw new HttpException(400, "ActorId is empty");

    const findActor: Actor = await ActorEntity.findOne({ where: { id: ActorId } });
    if (!findActor) throw new HttpException(409, "Actor doesn't exist");

    await ActorEntity.delete({ id: ActorId });
    return findActor;
  }
}

export default ActorService;
