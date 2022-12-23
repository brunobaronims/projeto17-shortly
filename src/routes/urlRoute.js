import { Router } from "express";

import { 
  shortenUrl,
  getUrl,
  redirectUrl
} from "../controllers/urlController.js";
import { authValidation } from "../middlewares/authValidation.js";
import { urlValidation } from "../middlewares/urlValidation.js";

const router = Router();

router.post('/urls/shorten', authValidation, urlValidation, shortenUrl);
router.get('/urls/:id', getUrl);
router.get('/urls/open/:shortUrl', redirectUrl);

export default router;