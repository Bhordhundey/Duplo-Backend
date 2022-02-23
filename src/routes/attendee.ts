import express from "express";
import {
  addAttendee,
  getListOfAttendees,
  listAttendeesForATalk,
} from "../controllers/attendee";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { AttendeeValidator } from "../validation/attendee";

const router = express.Router();

// ADD ATTENDEE
router.post("/", requireAuth, AttendeeValidator, validateRequest, addAttendee);

// GET LISTS OF ATTENDEES
router.get("/", requireAuth, getListOfAttendees);

// GET LISTS OF ATTENDEES FOR TALK
router.get("/talk/:id", requireAuth, listAttendeesForATalk);

export default router;
