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

async function getUserData(user) {
  const userData = (await pool.query(
    `
      SELECT
      users.id as id,
      users.name as name,
      (
        SELECT
        SUM(urls."visitCount")
      ) as "visitCount"
      FROM users
      INNER JOIN urls on urls."userId"=users.id
      WHERE users.id=$1
      GROUP BY users.id
    `, [user.id]
  )).rows[0];
  const shortenedUrls = (await pool.query(
    `
      SELECT
      id,
      "shortUrl",
      url,
      "visitCount"
      FROM urls
      WHERE urls."userId"=$1
    `, [user.id]
  )).rows;

  const data = {
    ...userData,
    shortenedUrls: shortenedUrls
  };
  
  return data;
};

async function getUserRanking() {
  const { rows } = await pool.query(`
  SELECT 
  users.id as id,
  users.name as name,
  (
    SELECT
    COUNT(urls)
  ) as "linksCount",
  (
    SELECT COALESCE (SUM(urls."visitCount"), 0)
  ) as "visitCount"
  FROM users
  LEFT JOIN urls ON urls."userId"=users.id
  GROUP BY users.id
  ORDER BY "visitCount" DESC
  LIMIT 10`
  );

  return rows;
};

const userRepository = {
  findEmail,
  findUserId,
  createUser,
  getUserData,
  getUserRanking
};

export default userRepository;