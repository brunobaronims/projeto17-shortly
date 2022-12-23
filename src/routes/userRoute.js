import { Router } from "express";

import {
  signIn,
  signUp
} from "../controllers/userController.js";
import { signinValidation } from "../middlewares/signinValidation.js";
import { signupValidation } from "../middlewares/signupValidation.js";

const router = Router();

router.post('/signup', signupValidation, signUp);
router.post('/signin', signinValidation, signIn);

export default router;