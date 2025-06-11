import { celebrate, Joi } from "celebrate";
import passwordComplexity from "joi-password-complexity";

export const registerUserValidation = celebrate({
  body: {
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  },
});

export const loginUserValidation = celebrate({
  body: {
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  },
});
