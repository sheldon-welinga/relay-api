import { ObjectType } from '@nestjs/graphql';

import { Connection } from 'src/lib/connections';
import { Country } from 'src/lib/entities';

@ObjectType()
export class CountryConnection extends Connection<Country>(Country) {}
