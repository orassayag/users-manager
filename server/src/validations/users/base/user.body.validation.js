import Joi from 'joi';
import userId from './user.id.validation.js';

export default {
  ...userId,
  title: Joi.string().min(2).max(10)
    .required(),
  firstName: Joi.string().min(2).max(100)
    .required(),
  lastName: Joi.string().min(2).max(100)
    .required(),
  address: Joi.string().min(10).max(300)
    .required(),
  country: Joi.string().min(2).max(100)
    .required(),
  age: Joi.number().integer().min(18).max(120)
    .required(),
  gender: Joi.string().valid('male', 'female')
    .required(),
  email: Joi.string().email()
    .required(),
  phone: Joi.string()
    .required(),
  picture: Joi.string().uri()
    .required(),
  thumbnail: Joi.string().uri()
    .required(),
};
