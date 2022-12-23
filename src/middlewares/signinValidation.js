import bcrypt from 'bcrypt';

import { signinSchema } from '../schema/signIn.js';
import userRepository from "../repositories/userRepository.js";

export async function signinValidation(req, res, next) {
  const { email, password } = req.body;

  try {
    await signinSchema.validateAsync(req.body);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  const user = await userRepository.findEmail(email);

  const userExists = user.length;
  if (!userExists)
    return res.status(401).send('Email não cadastrado');
  
  const passwordMatches = await bcrypt.compare(password, user[0].password);
  if (!passwordMatches)
    return res.status(401).send('Senha inválida');

  req.user = user[0];

  next();
};