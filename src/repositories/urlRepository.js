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
  SELECT 
  id,
  "shortUrl",
  url
  FROM urls
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

const urlRepository = {
  createUrl,
  getUrl,
  findShortUrl,
  updateCount,
  deleteUrl
};

export default urlRepository;