import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Country } from 'src/lib/entities';
import { CountryRespository } from 'src/lib/repository';
import { CountryService } from 'src/services';
import { CountryResolver } from 'src/resolvers';
import { CityModule } from 'src/modules';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), forwardRef(() => CityModule)],
  providers: [CountryService, CountryResolver, CountryRespository],
  exports: [CountryService, CountryRespository],
})
export class CountryModule {}
