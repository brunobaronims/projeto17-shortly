import bcrypt from 'bcrypt';
import { stripHtml } from 'string-strip-html';
import { nanoid } from 'nanoid/async';

import userRepository from "../repositories/userRepository.js";
import sessionRepository from '../repositories/sessionRepository.js';

export async function signUp(req, res) {
  const body = await req.body;
  const name = stripHtml(body.name).result;
  const saltRounds = 10;

  bcrypt.hash(body.password, saltRounds, async (err, hash) => {
    try {
      await userRepository.createUser({
        ...body,
        password: hash,
        name: name
      });

      return res.sendStatus(201);
    } catch (e) {
      return res.sendStatus(500);
    };
  });
};

export async function signIn(req, res) {
  const token = await nanoid(21);
  
  try {
    const id = req.user.id;
    await sessionRepository.createSession({
      token: token,
      id: id
    })

    res.status(200).send(token);
  } catch (e) {
    return res.sendStatus(500);
  }
}