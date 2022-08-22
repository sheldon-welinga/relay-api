import { DynamicModule, ForwardReference, Type } from '@nestjs/common';

import { CountryModule, CityModule, NodeModule } from 'src/modules';

export const modules: (
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>
)[] = [CountryModule, CityModule, NodeModule];

// eslint-disable-next-line @typescript-eslint/ban-types
export const graphqlModules: Function[] = [
  CountryModule,
  CityModule,
  NodeModule,
];
