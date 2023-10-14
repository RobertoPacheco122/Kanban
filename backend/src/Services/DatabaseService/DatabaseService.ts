import postgre, { QueryResult, QueryResultRow } from "pg";
import dotenv from "dotenv";

dotenv.config();

class Database {
  private database: postgre.Pool;

  constructor() {
    this.database = new postgre.Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT as unknown as number,
    });
  }

  public async Query<T extends QueryResultRow>(
    sqlCommand: string,
    parameters?: Array<string | number | boolean>
  ): Promise<QueryResult<T>> {
    const queryResult = await this.database.query(sqlCommand, parameters);

    return queryResult as QueryResult<T>;
  }
}

export default Database;
