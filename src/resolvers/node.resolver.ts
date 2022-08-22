import { NotFoundException } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Equal } from 'typeorm';
import { fromGlobalId } from 'graphql-relay';

import { CityErrorsEnum, CountryErrorsEnum } from 'src/lib/errors';
import { CursorsGlobal, ResolverGlobalArgs } from 'src/lib/global';
import { CityService, CountryService } from 'src/services';
import { Node } from 'src/lib/interfaces';

@Resolver(() => Node)
export class NodeResolver {
  constructor(
    private readonly countryService: CountryService,
    private readonly cityService: CityService,
  ) {}

  @Query(() => Node, { nullable: true })
  async node(
    @Args({ name: ResolverGlobalArgs.id, type: () => ID }) id: string,
  ) {
    const globalCursor = fromGlobalId(id);

    console.log('CCC', globalCursor);
    console.log('OOO', Object.values(CursorsGlobal));

    if (
      !globalCursor?.type ||
      !globalCursor?.id ||
      //@ts-expect-error (2345) : FIXME: Argument of type 'string' is not assignable to parameter of type 'CursorsGlobal'.
      !Object.values(CursorsGlobal).includes(globalCursor.type)
    ) {
      return null;
    }

    switch (globalCursor.type) {
      case CursorsGlobal.Country:
        const country = await this.countryService.getCountry({
          where: { code: Equal(globalCursor.id) },
        });

        if (!country) {
          throw new NotFoundException(CountryErrorsEnum.COUNTRY_NOT_FOUND);
        }

        return country;
      case CursorsGlobal.City:
        const city = await this.cityService.getCity({
          where: { id: Equal(globalCursor.id) },
        });

        if (!city) {
          throw new NotFoundException(CityErrorsEnum.CITY_NOT_FOUND);
        }

        console.log('hello', city);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        city.__typename = CursorsGlobal.City;

        return city;
      default:
        return null;
    }
  }
}
