import express from "express";
import {
  addAttendeeToTalk,
  addTalk,
  deleteTalk,
  getListOfTalks,
} from "../controllers/talk";
import { validateRequest } from "../middlewares/validate-request";
import { TalkAttendeeValidation, TalkValidation } from "../validation/talk";

const router = express.Router();

// ADD TALK
router.post("/", TalkValidation, validateRequest, addTalk);

// ADD AN ATTENDEE TO TALK
router.post(
  "/add-attendee",
  TalkAttendeeValidation,
  validateRequest,
  addAttendeeToTalk
);

// GET LIST OF TALKS
router.get("/", getListOfTalks);

// DELETE TALK
router.delete("/:id", deleteTalk);

export default router;
