import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Country } from 'src/lib/entities';
import { EntityRepository } from 'src/lib/repository';

@Injectable()
export class CountryRespository extends EntityRepository<Country> {
  constructor(
    @InjectRepository(Country) readonly countryRepository: Repository<Country>,
  ) {
    super(countryRepository);
  }
}
