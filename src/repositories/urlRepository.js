import { pool } from "../db/pg.js";

async function createUrl(data) {
  return await pool.query(
    `INSERT INTO urls ("userId", url, "shortUrl")
    VALUES ($1, $2, $3)`, [
    data.userId,
    data.url,
    data.shortUrl
  ]);
};

async function getUrl(id) {
  const { rows } = await pool.query(`
  SELECT * FROM urls
  WHERE id=$1`, [
    id
  ]);

  return rows;
};

async function findShortUrl(url) {
  const urlData = await pool.query(`
  SELECT * FROM urls
  WHERE "shortUrl"=$1`, [
    url
  ]);

  return urlData;
};

async function updateCount(url) {
  return await pool.query(`
  UPDATE urls
  SET "visitCount"="visitCount" + 1
  WHERE "shortUrl"=$1`, [
    url
  ]);
};

async function deleteUrl(id) {
  return await pool.query(`
  DELETE FROM urls
  WHERE id=$1`, [
    id
  ]);
};

async function getUserData(user) {
  const { rows } = await pool.query(`
  SELECT 
    id,
    "shortUrl",
    url,
    "visitCount"
  FROM urls
  WHERE "userId"=$1
  ORDER BY id`, [user.id]);

  const formattedData = {
    id: user.id,
    name: user.name,
    visitCount: user.visitCount,
    shortenedUrls: rows
  };
  return formattedData;
};

const urlRepository = {
  createUrl,
  getUrl,
  findShortUrl,
  updateCount,
  deleteUrl,
  getUserData
};

export default urlRepository;