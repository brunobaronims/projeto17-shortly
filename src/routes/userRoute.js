import { Router } from "express";

import {
  getUserData,
  signIn,
  signUp
} from "../controllers/userController.js";
import { authValidation } from "../middlewares/authValidation.js";
import { signinValidation } from "../middlewares/signinValidation.js";
import { signupValidation } from "../middlewares/signupValidation.js";

const router = Router();

router.post('/signup', signupValidation, signUp);
router.post('/signin', signinValidation, signIn);
router.get('/users/me', authValidation, getUserData);

export default router;