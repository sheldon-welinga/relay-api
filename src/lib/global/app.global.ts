/**
 * BuildSchemaOptionsGlobal are variables that are used in our buildSchemaOptions in our app
 */
export enum BuildSchemaOptionsGlobal {
  dateScalarMode = 'timestamp',
}

/**
 * ColumnDateGlobal refers to the 'type' and 'default' used mostly in our entities tables
 * */
export enum ColumnDateGlobal {
  type = 'timestamp',
  default = 'CURRENT_TIMESTAMP',
}

export enum ColumnTypeGlobal {
  decimal = 'decimal',
  text = 'text',
}

export enum JoinColumnNameGlobal {
  cities = 'cities',
  city_country = 'city_country',
  code = 'code',
}
