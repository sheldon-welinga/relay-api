import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { City } from 'src/lib/entities';
import { CityService, CountryService } from 'src/services';
import { CityResolver } from 'src/resolvers';
import { CityRespository } from 'src/lib/repository';
import { CountryModule } from 'src/modules';

@Module({
  imports: [TypeOrmModule.forFeature([City]), forwardRef(() => CountryModule)],
  providers: [CityService, CityResolver, CityRespository, CountryService],
  exports: [CityService, CityRespository],
})
export class CityModule {}
