import { body } from "express-validator";

export const TalkValidation = [
  body("code").notEmpty().withMessage("code is required"),
  body("code").isString().withMessage("code imust be a string"),
  body("name").notEmpty().withMessage("name is required"),
  body("name").isString().withMessage("name must be a string"),
  body("description").notEmpty().withMessage("description is required"),
  body("description").isString().withMessage("description must be a string"),
];

export const TalkAttendeeValidation = [
  body("talkId").notEmpty().withMessage("talkId is required"),
  body("attendeeId").isString().withMessage("attendeeId is required"),
];
