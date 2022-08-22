import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { connectionFromPromisedArray } from 'graphql-relay';

import { Country } from 'src/lib/entities';
import { ResolverGlobalArgs } from 'src/lib/global';
import { InsertCountryInput } from 'src/lib/inputs';
import { CityService, CountryService } from 'src/services';
import { CityConnectionRelation } from 'src/lib/relations';
import { getPageOffset, whereClauseFormat } from 'src/lib/utils';
import { CityInputBoolExp, CountryInputBoolExp } from 'src/lib/boolexp';
import { ConnectionArgs, CountryConnection } from 'src/lib/connections';

@Resolver(() => Country)
export class CountryResolver {
  constructor(
    private readonly countryService: CountryService,
    private readonly cityService: CityService,
  ) {}

  @Query(() => CountryConnection)
  async countries_connection(
    @Args() args: ConnectionArgs,
    @Args(ResolverGlobalArgs.where, { nullable: true })
    where?: CountryInputBoolExp,
  ) {
    const whereClause = whereClauseFormat<CountryInputBoolExp>(where);

    const count = await this.countryService.getCountriesCount({
      where: whereClause,
    });

    const { skip, take } = getPageOffset(count, args);

    return await connectionFromPromisedArray(
      this.countryService.getCountries({
        where: whereClause,
        take,
        skip,
      }),
      args,
    );
  }

  @ResolveField(() => CityConnectionRelation)
  async cities_connection(
    @Parent() parent: Country,
    @Args() args: ConnectionArgs,
    @Args(ResolverGlobalArgs.where, { nullable: true })
    where?: CityInputBoolExp,
  ) {
    where = {
      ...where,
      // @ts-expect-error (2740): FIXME: String_comparison_exp Type '{ _eq: string; }' is missing the following properties from type 'String_comparison_exp': _gt, _gte, _ilike, _in, and 14 more.
      country: {
        _eq: parent.code,
      },
    };

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

  @Mutation(() => Country)
  async insert_country(
    @Args(ResolverGlobalArgs.input) input: InsertCountryInput,
  ) {
    return await this.countryService.insertCountry(input);
  }
}
