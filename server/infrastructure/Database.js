require('dotenv').config();
const { Pool } = require('pg');

// Initialize a PostgreSQL connection pool with configuration from environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class Database {
    // Execute a query with parameters and return all rows
    async query(text, params) {
        const { rows } = await pool.query(text, params);
        return rows;
    }

    // Execute a query with parameters and return the first row
    async querySingle(text, params) {
        const { rows } = await pool.query(text, params);
        return rows[0];
    }

    // Initialize the database by creating necessary tables if they do not exist
    async initDb() {
        const createTablesQueries = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                fitness_goals TEXT,
                workout_preferences TEXT
            );

            CREATE TABLE IF NOT EXISTS workouts (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                status VARCHAR(50)
            );

            CREATE TABLE IF NOT EXISTS token_blacklist (
                token TEXT PRIMARY KEY,
                expiry TIMESTAMP NOT NULL
            );
        `;
        await pool.query(createTablesQueries);
    }

    async blacklistToken(token, expiry) {
        const sql = 'INSERT INTO token_blacklist (token, expiry) VALUES ($1, $2)';
        await this.query(sql, [token, new Date(expiry * 1000)]);
    }

    async isTokenBlacklisted(token) {
        const sql = 'SELECT * FROM token_blacklist WHERE token = $1';
        const result = await this.querySingle(sql, [token]);
        return !!result;
    }
}

module.exports = new Database();
