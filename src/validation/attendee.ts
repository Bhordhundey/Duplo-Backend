import { body, check } from "express-validator";

export const AttendeeValidator = [
  body("fullname").notEmpty().withMessage("fullname is required"),
  body("fullname").isString().withMessage("fullname must be a string"),
  body("dateOfBirth").notEmpty().withMessage("dateOfBirth is required"),
  body("dateOfBirth")
    .matches(/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/)
    .withMessage("Invalid dateOfBirth. Coreect format is yyyy-mm-dd"),
  //   check("dateOfBirth")
  //     .isISO8601()
  //     .toDate()
  //     .withMessage("dateOfBirth must be a Date"),
  body("bio").notEmpty().withMessage("bio is required"),
  body("bio").isString().withMessage("bio must be a string"),
];
