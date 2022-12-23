import joi from 'joi';

export const signupSchema = joi.object({
  name: joi.string()
  .required()
  .trim()
  .messages({
    'string.email': 'Nome inválido'
  }),
  email: joi.string()
  .required()
  .trim()
  .email({ tlds: { allow: false } })
  .messages({
    'string.email': 'Email inválido'
  }),
  password: joi.string()
  .required()
  .trim()
  .alphanum()
  .min(6)
  .messages({
    'string.alphanum': 'Senha deve conter apenas letras e números',
    'string.min': 'Senha deve conter pelo menos 6 caracteres'
  }),
  confirmPassword: joi.any()
  .valid(joi.ref('password'))
  .required()
  .messages({
    'any.only': 'Senhas devem ser iguais'
  })
});