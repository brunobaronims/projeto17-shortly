import { Router } from "express";

import { 
  shortenUrl,
  getUrl,
  redirectUrl,
  deleteUrl
} from "../controllers/urlController.js";
import { authValidation } from "../middlewares/authValidation.js";
import { createUrlValidation } from "../middlewares/createUrlValidation.js";
import { findUrlValidation } from "../middlewares/findUrlValidation.js";

const router = Router();

router.post('/urls/shorten', authValidation, createUrlValidation, shortenUrl);
router.get('/urls/:id', findUrlValidation, getUrl);
router.get('/urls/open/:shortUrl', redirectUrl);
router.delete('/urls/:id', authValidation, findUrlValidation, deleteUrl);

export default router;