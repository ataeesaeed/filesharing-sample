import {MigrationInterface, QueryRunner} from "typeorm";

export class tables1633071351234 implements MigrationInterface {
    name = 'tables1633071351234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`filesharing\`.\`file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`path\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`size\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`downloads\` int NOT NULL, \`createdAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`filesharing\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`ip\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`filesharing\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`filesharing\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`filesharing\`.\`file\``);
    }

}
