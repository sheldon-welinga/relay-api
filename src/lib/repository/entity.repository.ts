import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  InsertResult,
  ObjectID,
  Repository,
  SaveOptions,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';
import { RepositoryGlobalArgs } from '../global';

@Injectable()
export abstract class EntityRepository<Entity> {
  constructor(protected readonly entityModel: Repository<Entity>) {}

  async insertOne<T>(
    entity: QueryDeepPartialEntity<T>,
    field = RepositoryGlobalArgs.id,
  ): Promise<Entity> {
    // @ts-expect-error (2345): FIXME: Argument of type 'QueryDeepPartialEntity<T>' is not assignable to parameter of type 'QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[]'.
    const insertedEntity = await this.entityModel.insert(entity);

    return await this.entityModel.findOne({
      //@ts-expect-error (2322): FIXME: Type '{ [x: string]: any; }' is not assignable to type 'FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]'.
      where: { [field]: insertedEntity.identifiers?.[0]?.[field] },
    });
  }

  async insertMany(
    entities: QueryDeepPartialEntity<Entity>[],
    field = RepositoryGlobalArgs.id,
  ): Promise<Entity[]> {
    const insertedEntities = await this.entityModel.insert(entities);

    const insertedEntitiesArray = insertedEntities.raw?.map(
      (item: any) => item[field],
    );

    return await this.entityModel.find({
      //@ts-expect-error (2322): FIXME: Type '{ id: FindOperator<any>; }' is not assignable to type 'FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]'.
      where: { id: In(insertedEntitiesArray) },
    });
  }

  async saveOne(
    entityLike: DeepPartial<Entity>,
    options?: SaveOptions,
  ): Promise<Entity> {
    const entity = this.entityModel.create(entityLike);

    return await this.entityModel.save(entity, options);
  }

  async saveMany(
    entityLikeArray: DeepPartial<Entity>[],
    options?: SaveOptions,
  ): Promise<Entity[]> {
    const entities = this.entityModel.create(entityLikeArray);

    return await this.entityModel.save(entities, options);
  }

  async find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return await this.entityModel.find(options);
  }

  async findOne(options: FindOneOptions<Entity>): Promise<Entity> {
    return await this.entityModel.findOne(options);
  }

  async findOneBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Entity> {
    return await this.entityModel.findOneBy(where);
  }

  async findBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Entity[]> {
    return await this.entityModel.findBy(where);
  }

  async findAndCount(
    options?: FindManyOptions<Entity>,
  ): Promise<[Entity[], number]> {
    return await this.entityModel.findAndCount(options);
  }

  async findAndCountBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<[Entity[], number]> {
    return await this.entityModel.findAndCountBy(where);
  }

  async findByAndCount(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<[Entity[], number]> {
    return await this.entityModel.findAndCountBy(where);
  }

  async findOneByOrFail(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Entity> {
    return await this.entityModel.findOneByOrFail(where);
  }

  async findOneOrFail(options: FindOneOptions<Entity>): Promise<Entity> {
    return await this.entityModel.findOneOrFail(options);
  }

  async count(options?: FindManyOptions<Entity>): Promise<number> {
    return await this.entityModel.count(options);
  }

  async countBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<number> {
    return await this.entityModel.countBy(where);
  }

  async updateOne(
    entity: QueryDeepPartialEntity<Entity>,
    conflictPathsOrOptions: string[] | UpsertOptions<Entity>,
  ): Promise<InsertResult> {
    return await this.entityModel.upsert(entity, conflictPathsOrOptions);
  }

  async updateMany(
    entities: QueryDeepPartialEntity<Entity>[],
    conflictPathsOrOptions: string[] | UpsertOptions<Entity>,
  ): Promise<InsertResult> {
    return await this.entityModel.upsert(entities, conflictPathsOrOptions);
  }

  async softDeleteOne(
    criteria: string | number | FindOptionsWhere<Entity> | Date | ObjectID,
  ): Promise<UpdateResult> {
    return await this.entityModel.softDelete(criteria);
  }

  async softDeleteMany(
    criteria:
      | FindOptionsWhere<Entity>
      | string[]
      | ObjectID
      | number[]
      | Date[]
      | ObjectID[],
  ): Promise<UpdateResult> {
    return await this.entityModel.softDelete(criteria);
  }

  async deleteOne(
    criteria: string | number | FindOptionsWhere<Entity> | Date | ObjectID,
  ): Promise<DeleteResult> {
    return await this.entityModel.delete(criteria);
  }

  async deleteMany(
    criteria:
      | FindOptionsWhere<Entity>
      | string[]
      | ObjectID
      | number[]
      | Date[]
      | ObjectID[],
  ): Promise<DeleteResult> {
    return await this.entityModel.delete(criteria);
  }
}
