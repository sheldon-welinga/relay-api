import { ApolloDriver } from '@nestjs/apollo';
import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';
import { globalPrefix } from 'src/lib/constants';
import { BuildSchemaOptionsGlobal } from 'src/lib/global';
import { graphqlModules } from 'src/modules/init.module';

import { config } from 'dotenv';

config();

export const graphQLConfig: GqlModuleOptions = {
  include: [...graphqlModules],
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/lib/graphql/schema.gql'),
  buildSchemaOptions: {
    dateScalarMode: BuildSchemaOptionsGlobal.dateScalarMode,
  },
  path: globalPrefix,
};
