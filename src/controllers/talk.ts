import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { Attendee } from "../models/attendee";
import { TalkAttrs } from "../models/attributes/talk";
import { Talk } from "../models/talk";

export const addTalk = async (req: Request, res: Response) => {
  try {
    const { code, name, description } = req.body;

    const talk = Talk.build({
      code,
      name,
      description,
    });

    await talk.save().then((talk: TalkAttrs) => {
      res.status(201).send({
        status: true,
        message: "Talk has been successfully added",
        data: {
          id: talk.id,
          name: talk.name,
          code: talk.code,
          description: talk.description,
        },
      });
    });
  } catch (error) {
    throw new BadRequestError((error as Error).message);
  }
};

export const addAttendeeToTalk = async (req: Request, res: Response) => {
  try {
    const { talkId, attendeeId } = req.body;

    const talk = await Talk.findById(talkId);

    if (!talk) throw new BadRequestError("Invalid Input!! Talk not found");

    const attendee = await Attendee.findById(attendeeId);

    if (!attendee)
      throw new BadRequestError("Invalid Input!! Attendee not found");

    let talkAttendees = talk.attendees;

    if (talkAttendees.length > 0) {
      // Check if Attendee is already in talk
      if (talkAttendees.includes(attendeeId))
        throw new BadRequestError("Attendee is already added to talk");
    }

    let updatedAttendees = [...talkAttendees, attendeeId];

    Talk.findByIdAndUpdate(talkId, {
      attendees: updatedAttendees,
    }).then(() => {
      res.status(201).send({
        status: true,
        message: "Attendee has been successfully added to talk",
      });
    });

    if (!attendee)
      throw new BadRequestError("Invalid Input!! Attendee not found");
  } catch (error) {
    throw new BadRequestError((error as Error).message);
  }
};

export const getListOfTalks = async (req: Request, res: Response) => {
  try {
    Talk.find().then((talks: TalkAttrs[]) => {
      res.send({
        status: true,
        message: "Talk List Retrieved",
        data: talks.map((talk: TalkAttrs) => {
          return {
            id: talk.id,
            name: talk.name,
            code: talk.code,
            description: talk.description,
          };
        }),
      });
    });
  } catch (error) {
    throw new BadRequestError((error as Error).message);
  }
};

export const deleteTalk = async (req: Request, res: Response) => {
  try {
    const talkId = req.params.id;

    Talk.remove({ _id: talkId }).then(() => {
      res.send({
        status: true,
        message: "Talk has been successfully removed.",
      });
    });
  } catch (error) {
    throw new BadRequestError((error as Error).message);
  }
};
