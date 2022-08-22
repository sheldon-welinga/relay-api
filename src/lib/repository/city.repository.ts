import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City } from 'src/lib/entities';
import { EntityRepository } from 'src/lib/repository';

@Injectable()
export class CityRespository extends EntityRepository<City> {
  constructor(
    @InjectRepository(City) readonly cityRepository: Repository<City>,
  ) {
    super(cityRepository);
  }
}
