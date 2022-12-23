import { stripHtml } from "string-strip-html";
import { nanoid } from "nanoid/async";

import urlRepository from "../repositories/urlRepository.js";

export async function shortenUrl(req, res) {
  const body = await req.body;
  const url = stripHtml(body.url).result;
  const shortUrl = await nanoid(11);
  const data = {
    userId: await req.user[0].id,
    url: url,
    shortUrl: shortUrl
  };

  try {
    await urlRepository.createUrl(data);
  } catch (e) {
    return res.sendStatus(500);
  }

  return res.status(201).send({ shortUrl: shortUrl });
};

export async function getUrl(req, res) {  
  const urlData = req.urlData;

  const formattedData = {
    id: urlData.id,
    shortUrl: urlData.shortUrl,
    url: urlData.url
  };

  return res.status(200).send(formattedData);

};

export async function redirectUrl(req, res) {
  const shortUrl = req.params.shortUrl;

  try {
    const url = await urlRepository.findShortUrl(shortUrl);

    if (!url)
      return res.sendStatus(404);

    await urlRepository.updateCount(shortUrl);
    return res.redirect(url);
  } catch (e) {
    res.sendStatus(500);
  }
};

export async function deleteUrl(req, res) {
  const user = req.user[0];
  const urlData = req.urlData;

  if (user.id != urlData.userId) 
    return res.status(401).send('URL não pertence ao usuário');

  try {
    await urlRepository.deleteUrl(urlData.id)

    return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
};