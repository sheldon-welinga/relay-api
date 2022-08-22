import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Equal } from 'typeorm';
import { toGlobalId } from 'graphql-relay';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Country } from 'src/lib/entities';
import {
  CursorsGlobal,
  RelationsGlobal,
  RepositoryGlobalArgs,
} from 'src/lib/global';
import { CountryRespository } from 'src/lib/repository';
import { InsertCountryInput } from 'src/lib/inputs';
import { CountryErrorsEnum } from 'src/lib/errors';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRespository) {}

  async insertCountry(
    countryInput: QueryDeepPartialEntity<InsertCountryInput>,
  ): Promise<Country> {
    try {
      const foundCountry = await this.countryRepository.findOne({
        where: [
          { code: Equal(countryInput.code as string) },
          { name: Equal(countryInput.name as string) },
        ],
      });

      if (foundCountry) {
        throw new BadRequestException(CountryErrorsEnum.COUNTRY_ALREADY_EXISTS);
      }

      const country =
        await this.countryRepository.insertOne<InsertCountryInput>(
          countryInput,
          RepositoryGlobalArgs.code,
        );
      country.id = toGlobalId(CursorsGlobal.Country, country.code);

      return country;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getCountries(options?: FindManyOptions<Country>): Promise<Country[]> {
    try {
      const countries = await this.countryRepository.find({
        ...options,
        relations: [RelationsGlobal.cities],
      });

      return countries.map((country) => ({
        ...country,
        id: toGlobalId(CursorsGlobal.Country, country.code),
      }));
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getCountry(options: FindOneOptions<Country>): Promise<Country | null> {
    try {
      const country = await this.countryRepository.findOne(options);

      if (country) {
        country.id = toGlobalId(CursorsGlobal.Country, country.code);
      }

      return country;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getCountriesCount(options?: FindManyOptions<Country>): Promise<number> {
    try {
      return await this.countryRepository.count(options);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
