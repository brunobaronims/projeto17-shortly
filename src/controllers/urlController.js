import { stripHtml } from "string-strip-html";
import { nanoid } from "nanoid/async";

import urlRepository from "../repositories/urlRepository.js";
import userRepository from "../repositories/userRepository.js";

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
    await userRepository.increaseLinkCount(await req.user[0].id);
  } catch (e) {
    return res.sendStatus(500);
  }

  return res.status(201).send({ shortUrl: shortUrl });
};

export async function getUrl(req, res) {  
  const urlData = req.urlData;

  return res.status(200).send(urlData);

};

export async function redirectUrl(req, res) {
  const shortUrl = req.params.shortUrl;

  try {
    const urlData = (await urlRepository.findShortUrl(shortUrl)).rows[0];

    const url = urlData.url;
    if (!url)
      return res.sendStatus(404);
    
    await userRepository.increaseVisitCount(urlData.userId);
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
    await userRepository.decreaseLinkCount(user.id);

    return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
};