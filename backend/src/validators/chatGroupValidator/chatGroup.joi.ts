import { celebrate, Joi } from "celebrate";

export const createChatGroupValidation = celebrate({
  body: {
    title: Joi.string().required().label("Title"),
    passcode: Joi.string().required().label("Passcode"),
  },
});
