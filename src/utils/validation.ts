import Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string()
    .regex(/^\S+@\S+\.\S{2,}$/)
    .lowercase()
    .required()
    .messages({
      "string.pattern.base":
        "Please enter a valid email address in the format name@example.example",
    }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .regex(/^\S+@[A-Za-z0-9.-]+\.\S{2,}$/)
    .lowercase()
    .required()
    .messages({
      alert:
        "Kindly input a valid email address following the pattern: name@example.com",
    }),
  password: Joi.string().required(),
});

export const blogSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
});

export const contactFormSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string()
    .regex(/^\S+@[A-Za-z0-9.-]+\.\S{2,}$/)
    .required()
    .messages({
      alert:
        "Kindly input a valid email address following the pattern: name@example.com",
    }),
  message: Joi.string().required(),
});
