import sessionRepository from "../repositories/sessionRepository.js";
import userRepository from "../repositories/userRepository.js";

export async function authValidation(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.replace('Bearer ', '');

  console.log(token);

  if (!token)
    return res.status(401).send('Falha de autenticação');

  try {
    const session = await sessionRepository.findSession(token);

    const sessionExists = session.length;
    if (!sessionExists)
      return res.status(401).send('Sessão não encontrada');

    const user = await userRepository.findUserId(session[0].userId);

    const userExists = user.length;
    if (!userExists)
      return res.status(401).send('Usuário não encontrado');

    req.user = user;
  } catch (e) {
    return res.sendStatus(500);
  }

  next();
}