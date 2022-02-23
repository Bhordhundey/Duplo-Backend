import express from "express";
import {
  addAttendeeToTalk,
  addTalk,
  deleteTalk,
  getListOfTalks,
} from "../controllers/talk";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { TalkAttendeeValidation, TalkValidation } from "../validation/talk";

const router = express.Router();

// ADD TALK
router.post("/", requireAuth, TalkValidation, validateRequest, addTalk);

// ADD AN ATTENDEE TO TALK
router.post(
  "/add-attendee",
  requireAuth,
  TalkAttendeeValidation,
  validateRequest,
  addAttendeeToTalk
);

// GET LIST OF TALKS
router.get("/", requireAuth, getListOfTalks);

// DELETE TALK
router.delete("/:id", requireAuth, deleteTalk);

export default router;
