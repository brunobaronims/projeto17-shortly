import { signupSchema } from '../schema/signUp.js';
import userRepository from '../repositories/userRepository.js';

export async function signupValidation(req, res, next) {
  const body = req.body;
  
  try {
    await signupSchema.validateAsync(body);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  const emailExists = (await userRepository.findEmail(body.email)).length;
  if (emailExists) 
    return res.status(409).send('Email já cadastrado');

  next();
} 