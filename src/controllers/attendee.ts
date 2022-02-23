import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { Attendee } from "../models/attendee";
import { AttendeeAttrs } from "../models/attributes/attendee";
import { TalkAttrs } from "../models/attributes/talk";
import { Talk } from "../models/talk";

export const addAttendee = async (req: Request, res: Response) => {
  try {
    const { fullname, dateOfBirth, bio } = req.body;

    const attendee = Attendee.build({
      fullname,
      date_of_birth: dateOfBirth,
      bio,
    });

    await attendee.save().then(() => {
      res.status(201).send({
        status: true,
        message: "Attendee has been successfully added",
      });
    });
  } catch (error) {
    throw new BadRequestError((error as Error).message);
  }
};

export const getListOfAttendees = async (req: Request, res: Response) => {
  try {
    Attendee.find().then((attendees: any) => {
      res.send({
        status: true,
        message: "Talk List Retrieved",
        data: attendees.map((attendee: AttendeeAttrs) => {
          return {
            id: attendee.id,
            fullname: attendee.fullname,
            dateOfBirth: attendee.date_of_birth,
            bio: attendee.bio,
          };
        }),
      });
    });
  } catch (error) {
    throw new BadRequestError((error as Error).message);
  }
};

export const listAttendeesForATalk = async (req: Request, res: Response) => {
  try {
    const talkId = req.params.id;
    Talk.findOne({ _id: talkId })
      .populate("attendees")
      .then((talk) => {
        res.send({
          status: true,
          message: "Talk List Retrieved",
          // data: talk,
          data: talk?.attendees,
        });
      });
  } catch (error) {
    throw new BadRequestError((error as Error).message);
  }
};
