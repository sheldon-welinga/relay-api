import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { toGlobalId } from 'graphql-relay';
import { Equal, FindManyOptions, FindOneOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { City } from 'src/lib/entities';
import { CursorsGlobal } from 'src/lib/global';
import { CityRespository, CountryRespository } from 'src/lib/repository';
import { InsertCityInput } from 'src/lib/inputs';
import { CityErrorsEnum, CountryErrorsEnum } from 'src/lib/errors';

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepository: CityRespository,
    private readonly countryRepository: CountryRespository,
  ) {}

  async insertCity(
    cityInput: QueryDeepPartialEntity<InsertCityInput>,
  ): Promise<City> {
    try {
      const foundCity = await this.cityRepository.findOne({
        where: { name: Equal(cityInput.name as string) },
      });

      if (foundCity) {
        throw new BadRequestException(CityErrorsEnum.CITY_ALREADY_EXISTS);
      }

      const country = await this.countryRepository.findOne({
        where: { code: Equal(cityInput.country as string) },
      });

      if (!country) {
        throw new NotFoundException(CountryErrorsEnum.COUNTRY_NOT_FOUND);
      }

      const city = await this.cityRepository.insertOne(cityInput);
      city.id = toGlobalId(CursorsGlobal.City, city.id);

      return city;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getCities(options?: FindManyOptions<City>): Promise<City[]> {
    try {
      const cities = await this.cityRepository.find(options);

      return cities.map((city) => ({
        ...city,
        id: toGlobalId(CursorsGlobal.City, city.id),
      }));
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getCity(options: FindOneOptions<City>): Promise<City> {
    try {
      const city = await this.cityRepository.findOne(options);

      if (!city) {
        throw new NotFoundException(CityErrorsEnum.CITY_NOT_FOUND);
      }

      return city;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getCitiesCount(options?: FindManyOptions<City>): Promise<number> {
    try {
      return await this.cityRepository.count(options);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
