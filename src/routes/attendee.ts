import express from "express";
import {
  addAttendee,
  getListOfAttendees,
  listAttendeesForATalk,
} from "../controllers/attendee";
import { validateRequest } from "../middlewares/validate-request";
import { AttendeeValidator } from "../validation/attendee";

const router = express.Router();

// ADD ATTENDEE
router.post("/", AttendeeValidator, validateRequest, addAttendee);

// GET LISTS OF ATTENDEES
router.get("/", getListOfAttendees);

// GET LISTS OF ATTENDEES FOR TALK
router.get("/talk/:id", listAttendeesForATalk);

export default router;
