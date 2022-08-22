import { ObjectType } from '@nestjs/graphql';

import { Connection } from 'src/lib/connections';
import { City } from 'src/lib/entities';

@ObjectType()
export class CityConnection extends Connection<City>(City) {}
