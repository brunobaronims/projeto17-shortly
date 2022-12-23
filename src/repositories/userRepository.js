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

async function getUserData(user) {
  const { rows } = await pool.query(`
  SELECT * FROM urls
  WHERE "userId"=$1
  ORDER BY id`, [user.id]);
  const formattedRows = rows.map(r => {
    const {
      createdAt,
      userId,
      ...newRow
    } = r;

    return newRow;
  });

  const sum = (await pool.query(`
  SELECT sum("visitCount")
  FROM urls
  WHERE "userId"=$1`, [user.id]
  )).rows[0].sum;

  const formattedData = {
    id: user.id,
    name: user.name,
    visitCount: sum,
    shortenedUrls: formattedRows
  };
  return formattedData;
};

const userRepository = {
  findEmail,
  findUserId,
  createUser,
  getUserData
};

export default userRepository;