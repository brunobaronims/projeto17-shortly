import joi from 'joi';

export const urlSchema = joi.object({
  url: joi.string()
  .required()
  .uri()
  .trim()
  .messages({
    'string.uri': 'URL inválido'
  })
});