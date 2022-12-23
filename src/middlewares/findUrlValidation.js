import urlRepository from "../repositories/urlRepository.js";

export async function findUrlValidation(req, res, next) {
  const id = req.params.id;

  try {
    const urlRes = await urlRepository.getUrl(id);

    const urlExists = urlRes.length;
    if (!urlExists)
      return res.sendStatus(404);

    req.urlData = urlRes[0];

    next();
  } catch (e) {
    return res.sendStatus(500);
  }
};