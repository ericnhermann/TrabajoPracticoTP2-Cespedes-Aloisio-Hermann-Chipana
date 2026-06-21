const { env } = process;

const SERVER_PORT = env.SERVER_PORT ?? 3000;
const SECRET = env.SECRET ?? "dev-secret-lavadero";
const DB_HOST = env.DB_HOST ?? "localhost";
const DB_PORT = env.DB_PORT ?? 3306;
const DB_USER = env.DB_USER ?? "root";
const DB_PASSWORD = env.DB_PASSWORD ?? "";
const DB_NAME = env.DB_NAME ?? "lavadero";
const DB_DIALECT = env.DB_DIALECT ?? "mysql";

export {
  SERVER_PORT,
  SECRET,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_DIALECT,
};
