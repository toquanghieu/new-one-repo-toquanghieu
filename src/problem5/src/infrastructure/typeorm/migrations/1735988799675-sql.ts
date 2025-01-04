import { MigrationInterface, QueryRunner } from "typeorm";

export class Sql1735988799675 implements MigrationInterface {
    name = 'Sql1735988799675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`resources\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(200) NOT NULL, \`description\` varchar(500) NOT NULL, \`status\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`resources\``);
    }

}
