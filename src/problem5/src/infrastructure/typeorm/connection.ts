import { DataSource } from "typeorm";
import 'dotenv/config';

class TypeORMDataSource extends DataSource {
  constructor() {
    super({
      type: "mysql",
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      synchronize: false,
      logging: false,
      entities: ["src/entities/**/*.ts"],
      migrations: ["src/**/infrastructure/typeorm/migrations/*.ts"],
      subscribers: ["src/**/infrastructure/typeorm/subscribers/*.ts"],
    });
  }
}

const dataSource = new TypeORMDataSource();

export default dataSource;
