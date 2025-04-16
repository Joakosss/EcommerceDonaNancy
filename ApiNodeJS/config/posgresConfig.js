import pgPromise from "pg-promise"; // para conectar y hacer consultas a una bd posgres

const pgp = pgPromise();

const db = pgp({
  host: "localhost",
  port: 5432,
  database: "Nancy",
  user: "postgres",
  password: "123456789",
});

export default db;
