import { Equal } from 'typeorm';
import { connectionFromPromisedArray } from 'graphql-relay';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { City, Country } from 'src/lib/entities';
import { CityService, CountryService } from 'src/services';
import { ResolverGlobalArgs } from 'src/lib/global';
import { CityInputBoolExp } from 'src/lib/boolexp';
import { getPageOffset, whereClauseFormat } from 'src/lib/utils';
import { CityConnection, ConnectionArgs } from 'src/lib/connections';
import { InsertCityInput } from 'src/lib/inputs';

@Resolver(() => City)
export class CityResolver {
  constructor(
    private readonly cityService: CityService,
    private readonly countryService: CountryService,
  ) {}

  @Query(() => CityConnection)
  async cities_connection(
    @Args() args: ConnectionArgs,
    @Args(ResolverGlobalArgs.where, { nullable: true })
    where?: CityInputBoolExp,
  ) {
    const whereClause = whereClauseFormat<CityInputBoolExp>(where);

    const count = await this.cityService.getCitiesCount({
      where: whereClause,
    });

    const { skip, take } = getPageOffset(count, args);

    return await connectionFromPromisedArray(
      this.cityService.getCities({
        where: whereClause,
        skip,
        take,
      }),
      args,
    );
  }

  @ResolveField(() => Country)
  async city_country(@Parent() parent: City) {
    return await this.countryService.getCountry({
      where: { code: Equal(parent.country) },
    });
  }

  @Mutation(() => City, {
    description: "Insert a single city to 'cities' table",
  })
  async insert_city(@Args(ResolverGlobalArgs.input) input: InsertCityInput) {
    return await this.cityService.insertCity(input);
  }
}
