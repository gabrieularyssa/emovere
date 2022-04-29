import pg from "pg";
const { Pool } = pg;

let localPoolConfig = {
	user: "testuser",
	password: "123456789",
	host: "localhost",
	port: "5432",
	database: "test_jwt",
};

const poolConfig = process.env.DATABASE_URL
	? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
	: localPoolConfig;

const pool = new Pool(poolConfig);
export default pool;
