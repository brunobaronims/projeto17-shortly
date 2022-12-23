import { pool } from "../db/pg.js";

async function createSession({ token, id }) {
  return await pool.query(
    `INSERT INTO sessions (token, "userId")
    VALUES ($1, $2)`, [
    token,
    id
  ]);
};

async function findSession(token) {
  const { rows } = await pool.query(
    `SELECT * FROM sessions
    WHERE token=$1`, [
      token
    ]);

  return rows;
};

const sessionRepository = {
  createSession,
  findSession
};

export default sessionRepository;