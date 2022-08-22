import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCountryAndCityEntities1661111069405
  implements MigrationInterface
{
  name = 'addCountryAndCityEntities1661111069405';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "countries" ("code" text NOT NULL, "name" character varying NOT NULL, "longitude" numeric, "latitude" numeric, CONSTRAINT "UQ_fa1376321185575cf2226b1491d" UNIQUE ("name"), CONSTRAINT "PK_b47cbb5311bad9c9ae17b8c1eda" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cities" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "country" character varying NOT NULL, "name" character varying NOT NULL, "longitude" numeric, "latitude" numeric, "city_country" text, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" ADD CONSTRAINT "FK_383b32a0b8869fd06d182ef27ca" FOREIGN KEY ("city_country") REFERENCES "countries"("code") ON DELETE NO ACTION ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cities" DROP CONSTRAINT "FK_383b32a0b8869fd06d182ef27ca"`,
    );
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP TABLE "countries"`);
  }
}
