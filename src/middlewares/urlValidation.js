import { urlSchema } from "../schema/url.js";

export async function urlValidation(req, res, next) {
  const body = req.body;

  try {
    await urlSchema.validateAsync(body);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  next();
};