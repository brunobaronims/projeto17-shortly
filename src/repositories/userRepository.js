import { pool } from "../db/pg.js";

async function findEmail(email) {
  const { rows } = await pool.query(
    `SELECT * FROM users
    WHERE email=$1`, [
    email
  ]);

  return rows;
};

async function findUserId(id) {
  const { rows } = await pool.query(
    `SELECT * FROM users
    WHERE id=$1`, [
    id
  ]);

  return rows;
}

async function createUser(user) {
  return await pool.query(
    `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)`, [
    user.name,
    user.email,
    user.password
  ]);
};

const userRepository = {
  findEmail,
  findUserId,
  createUser
};

export default userRepository;