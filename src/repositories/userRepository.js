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
};

async function createUser(user) {
  return await pool.query(
    `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)`, [
    user.name,
    user.email,
    user.password
  ]);
};

async function increaseLinkCount(id) {
  return await pool.query(`
  UPDATE users
  SET "linksCount"="linksCount" + 1
  WHERE id=$1`, [
    id
  ]);
};

async function decreaseLinkCount(id) {
  return await pool.query(`
  UPDATE users
  SET "linksCount"="linksCount" - 1
  WHERE id=$1`, [
    id
  ]);
};

async function increaseVisitCount(id) {
  return await pool.query(`
  UPDATE users
  SET "visitCount"="visitCount" + 1
  WHERE id=$1`, [
    id
  ]);
};

async function getUserRanking() {
  const { rows } = await pool.query(`
  SELECT 
  id,
  name,
  "linksCount",
  "visitCount"
  FROM users
  ORDER BY "visitCount" DESC
  LIMIT 10`
  );

  return rows;
};

const userRepository = {
  findEmail,
  findUserId,
  createUser,
  increaseVisitCount,
  increaseLinkCount,
  decreaseLinkCount,
  getUserRanking
};

export default userRepository;