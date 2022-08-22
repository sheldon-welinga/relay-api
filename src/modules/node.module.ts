import { Module } from '@nestjs/common';
import { NodeResolver } from 'src/resolvers';

import { CityModule, CountryModule } from 'src/modules';

@Module({
  imports: [CountryModule, CityModule],
  providers: [NodeResolver],
})
export class NodeModule {}
