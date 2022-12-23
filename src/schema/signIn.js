import joi from 'joi';

export const signinSchema = joi.object({
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
});